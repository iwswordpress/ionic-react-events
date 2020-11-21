import { IonApp, IonLoading } from '@ionic/react';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthContext, useAuthInit } from './auth';

import AppTabs from './AppTabs';

const App: React.FC = () => {
  const authState = useAuthInit();

  console.log(`rendering App with authState`, authState);
  if (authState.loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={authState.auth}>
        <IonReactRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route path='/register'>
              <RegisterPage onLogin={() => {}} />
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
