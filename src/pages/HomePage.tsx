import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonIcon
} from '@ionic/react';
import React from 'react';

import './HomePage.css';
import { entries } from '../data';
import { arrowForwardOutline as arrowIcon } from 'ionicons/icons';
const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList>
          {entries.map(entry => (
            <IonItem button key={entry.id} routerLink={`entries/${entry.id}`}>
              {entry.title}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
