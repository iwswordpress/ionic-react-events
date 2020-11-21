import { IonApp } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthContext } from './auth';
import { auth } from './firebase';
import AppTabs from './AppTabs';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(
    () =>
      auth.onAuthStateChanged(user => {
        console.log('onAuthStateChanged:', user);
        setLoggedIn(Boolean(user));
      }),
    []
  );
  console.log(`rendering App with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route path='/register'>
              <RegisterPage onLogin={() => setLoggedIn(true)} />
            </Route>
            <Route path='/my'>
              <AppTabs />
            </Route>
            <Redirect exact path='/' to='/my/entries' />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
