import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { trash as trashIcon } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './EntryPage.css';
import { firestore } from '../firebase';
import { Entry, toEntry, RouteParams } from '../models';
import { useAuth } from '../auth';

const EntryPage: React.FC = () => {
  console.log('render Entry');
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  const history = useHistory();

  useEffect(() => {
    //const entryRef = firestore.collection('entries').doc(id);
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);
    entryRef.get().then(doc => {
      const entryDoc = toEntry(doc);
      console.log('entryDoc: ', entryDoc);
      setEntry(toEntry(doc));
    });
  }, [id]);

  const handleDelete = async () => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);
    await entryRef.delete();
    console.log(`Item ${id} ${entry.title} DELETED`);
    history.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton> Back</IonBackButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trashIcon} slot='icon-only' />
            </IonButton>
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
