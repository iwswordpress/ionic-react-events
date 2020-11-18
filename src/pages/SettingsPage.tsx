import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterLink
} from '@ionic/react';
import React from 'react';

import './HomePage.css';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        Go to <IonRouterLink routerLink='/home'>Home</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
