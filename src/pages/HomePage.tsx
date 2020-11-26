import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import './HomePage.css';
import { toEntry } from '../models';

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const entriesRef = firestore.collection('entries');
    // entriesRef.get().then(snapshot => {
    //   console.log('snapshot', snapshot);
    //   snapshot.docs.forEach(doc => {
    //     console.log(doc.id, doc.data());
    //     const entriesArray = snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data()
    //     }));
    //     console.log('entriesArray:', entriesArray);
    //     setEntries(entriesArray);
    //   });
    entriesRef.get().then(({ docs }) => setEntries(docs.map(toEntry)));
  }, []);

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
            <IonItem
              button
              key={entry.id}
              routerLink={`/my/entries/${entry.id}`}
            >
              {entry.title}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
