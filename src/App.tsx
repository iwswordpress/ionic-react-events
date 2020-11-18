import { IonApp, IonRouterOutlet } from '@ionic/react';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';
const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rendering App with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path='/login'>
            <LoginPage loggedIn={loggedIn} onLogin={() => setLoggedIn(true)} />
          </Route>
          <Route path='/my'>
            <AppTabs loggedIn={loggedIn} />
          </Route>
          <Redirect exact path='/' to='/my/entries' />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
