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

import './AddEntryPage.css';

const AddEntryPage: React.FC = () => {
  console.log('render Add');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton> Back</IonBackButton>
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding '>TODO</IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
