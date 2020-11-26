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
// import { entries } from '../data';
import './EntryPage.css';
import { firestore } from '../firebase';
interface RouteParams {
  id: string;
}
const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<any>();

  useEffect(() => {
    const entryRef = firestore.collection('entries').doc(id);
    entryRef.get().then(doc => {
      const entryDoc = { id: doc.id, ...doc.data() };
      console.log('entryDoc: ', entryDoc);
      setEntry(entryDoc);
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
