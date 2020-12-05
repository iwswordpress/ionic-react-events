import {
  IonIcon,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {
  trash as trashIcon,
  createOutline as editIcon,
  arrowBack as backIcon
} from 'ionicons/icons';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import './EntryPage.css';
import { firestore } from '../firebase';
import { Entry, toEntry, RouteParams } from '../models';
import { useAuth } from '../auth';
import { formatDate } from '../date';
import './EntryPage.css';

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>();
  const goBack = () => history.goBack();
  const getEntry = (userId, id) => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);
    entryRef.get().then(doc => {
      const entryDoc = toEntry(doc);
      setEntry(toEntry(doc));
      setDate(entryDoc.date);
      setTitle(entryDoc.title);
      setDescription(entryDoc.description);
    });
  };
  useEffect(() => {
    //const entryRef = firestore.collection('entries').doc(id);
    getEntry(userId, id);
  }, [id]);

  const handleDelete = async () => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);
    await entryRef.delete();
    history.goBack();
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleUpdate = async () => {
    const entryData = { date, title, description };
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);

    await entryRef.update({
      date,
      title,
      description
    });
    getEntry(userId, id);
    //history.goBack();
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
            <IonButton onClick={toggleForm}>
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
        <div className='entry'>{formatDate(entry?.date)}</div>
        <div className='title'>{entry?.title} </div>
        <div className='description'>{entry?.description} </div>
      </IonContent>
      {showForm && (
        <div>
          <IonItem>
            <IonLabel position='stacked'>Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={event => setDate(event.detail.value)}
            />
          </IonItem>
          <IonList>
            <IonItem>
              <IonLabel position='stacked'>Title</IonLabel>
              <IonInput
                value={title}
                onIonChange={event => setTitle(event.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Picture</IonLabel>
              <br />
              <input
                type='file'
                accept='image/*'
                hidden
                ref={fileInputRef}
                // onChange={handleFileChange}
              />
              <img
                src={pictureUrl}
                alt=''
                style={{ cursor: 'pointer' }}
                // onClick={handlePictureClick}
              />
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Description</IonLabel>
              <IonTextarea
                value={description}
                onIonChange={event => setDescription(event.detail.value)}
              />
            </IonItem>
          </IonList>
          <IonButton expand='block' onClick={handleUpdate}>
            Update
          </IonButton>
        </div>
      )}
    </IonPage>
  );
};

export default EntryPage;
