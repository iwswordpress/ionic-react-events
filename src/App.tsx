import { IonApp, IonLoading } from '@ionic/react';
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
  const [authState, setAuthState] = useState({
    loggedIn: false,
    loading: true
  });

  useEffect(
    () =>
      auth.onAuthStateChanged(user => {
        console.log('onAuthStateChanged:', user);
        setAuthState({ loading: false, loggedIn: Boolean(user) });
      }),
    []
  );
  console.log(`rendering App with authState`, authState);
  if (authState.loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: authState.loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route path='/register'>
              <RegisterPage
                onLogin={() => {
                  setAuthState({ loading: false, loggedIn: true });
                }}
              />
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
