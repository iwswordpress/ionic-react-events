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
import {
  trash as trashIcon,
  createOutline as editIcon,
  arrowBack as backIcon
} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './EntryPage.css';
import { firestore } from '../firebase';
import { Entry, toEntry, RouteParams } from '../models';
import { useAuth } from '../auth';
import './EntryPage.css';

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
  const goBack = () => history.goBack();
  const handleEdit = () => {
    console.log(`HANDLE EDIT ${id}`);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton onClick={goBack}>
              <IonIcon icon={backIcon} slot='icon-only' />
            </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton href={`/my/entries/edit/${id}`}>
              <IonIcon icon={editIcon} slot='icon-only' />
            </IonButton>
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trashIcon} slot='icon-only' />
            </IonButton>
          </IonButtons>
          <IonTitle>View Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding '>
        <div className='entry'>{entry?.id}</div>
        <div className='title'>{entry?.title} </div>
        <div className='description'>{entry?.description} </div>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
