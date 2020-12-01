import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon
} from '@ionic/react';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  home as homeIcon,
  settings as settingsIcon,
  planetOutline as planetOutlineIcon
} from 'ionicons/icons';
import HomePage from './pages/HomePage';
import { useAuth } from './auth';
import SettingsPage from './pages/SettingsPage';
import EntryPage from './pages/EntryPage';
import WebComponents from './pages/WebComponents';

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to='/login' />;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path='/my/entries'>
          <HomePage />
        </Route>
        <Route exact path='/my/entries/:id'>
          <EntryPage />
        </Route>
        <Route exact path='/my/settings'>
          <SettingsPage />
        </Route>
        <Route exact path='/my/webcomponents'>
          <WebComponents />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='home' href='/my/entries'>
          <IonIcon icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab='web' href='/my/webcomponents'>
          <IonIcon icon={planetOutlineIcon} />
          <IonLabel>Stocks</IonLabel>
        </IonTabButton>
        <IonTabButton tab='settings' href='/my/settings'>
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
