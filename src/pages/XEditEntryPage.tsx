import {
  IonBackButton,
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
import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams, Redirect } from 'react-router';
import { Entry, toEntry, RouteParams } from '../models';
import { useAuth } from '../auth';
import { firestore } from '../firebase';

const EditEntryPage: React.FC = () => {
  const { userId } = useAuth();

  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  const history = useHistory();

  const [date, setDate] = useState('5 DEC 2020');
  const [title, setTitle] = useState('Get from firestore');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('Description from DB');
  const fileInputRef = useRef<HTMLInputElement>();
  useEffect(
    () => () => {
      if (pictureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pictureUrl);
      }
    },
    [pictureUrl]
  );
  const goBack = () => history.goBack();
  const handleUpdate = async () => {
    const rnd = Math.floor(Math.random() * 1000);
    //console.log('UPDATE');
    const entryData = { date, title, description };
    //console.log('New entry will be: ', entryData);
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);

    await entryRef.update({
      date,
      title: `${rnd} - ${title}`,
      description: `NEW! ${rnd} - ${description}`
    });

    history.goBack();
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
          <IonTitle>Edit Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <h3>{id}</h3>
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
      </IonContent>
    </IonPage>
  );
};

export default EditEntryPage;
