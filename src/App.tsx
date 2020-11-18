import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon
} from '@ionic/react';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import EntryPage from './pages/EntryPage';
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
            <AppTabs />
          </Route>
          <Redirect exact path='/' to='/login' />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
