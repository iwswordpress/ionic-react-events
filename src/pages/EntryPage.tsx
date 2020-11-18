import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { entries } from '../data';
import './EntryPage.css';

interface RouteParams {
  id: string;
}
const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const entry = entries.find(entry => entry.id === id);
  if (!entry) {
    throw new Error('No such entry');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton> Back</IonBackButton>
          </IonButtons>
          <IonTitle>
            {entry.id}: {entry.title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>{entry.description} </IonContent>
    </IonPage>
  );
};

export default EntryPage;
