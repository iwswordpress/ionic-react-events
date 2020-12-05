import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonThumbnail,
  IonImg
} from '@ionic/react';
import {
  home as homeIcon,
  add as addIcon,
  planetOutline as planetOutlineIcon
} from 'ionicons/icons';

import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import './HomePage.css';
import { toEntry } from '../models';
import { useAuth } from '../auth';
import { formatDate } from '../date';

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  console.log('userId: ', userId);
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');

    return entriesRef
      .orderBy('date', 'desc')
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);
  console.log('[HomePage] render entries: ', entries);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <p>{userId}</p>
        <IonList>
          {entries.map(entry => (
            <IonItem
              button
              key={entry.id}
              routerLink={`/my/entries/view/${entry.id}`}
            >
              <IonThumbnail slot='end'>
                <IonImg src={entry.pictureUrl} />
              </IonThumbnail>
              <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton routerLink='/my/entries/add'>
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
