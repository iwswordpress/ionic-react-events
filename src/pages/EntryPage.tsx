import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './EntryPage.css';
import { firestore } from '../firebase';
import { Entry, toEntry, RouteParams } from '../models';

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore.collection('entries').doc(id);
    entryRef.get().then(doc => {
      const entryDoc = toEntry(doc);
      console.log('entryDoc: ', entryDoc);
      setEntry(toEntry(doc));
    });
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton> Back</IonBackButton>
          </IonButtons>
          <IonTitle>
            {entry?.id}:{entry?.title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding '>
        <div className='desc'>{entry?.description} </div>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
