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
import { useAuth } from '../auth';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'uc-stock-finder': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
    interface IntrinsicElements {
      'my-component': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
    interface IntrinsicElements {
      'iws-test': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
    interface IntrinsicElements {
      'app-home': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
    interface MyElementAttributes {
      'first-name': string;
      'middle-name': string;
      'last-name': string;
    }
    interface IntrinsicElements {
      'uc-stock-price': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
const HomePage: React.FC = () => {
  const { userId } = useAuth();
  console.log('userId: ', userId);
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
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
  }, [userId]);

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
              routerLink={`/my/entries/${entry.id}`}
            >
              {entry.title}
            </IonItem>
          ))}
        </IonList>
        {/* 
        <div style={{ marginTop: '30px', color: '#2196f3' }}>
          <my-component
            first-name='Craig'
            middle-name='George'
            last-name='West'
          ></my-component>
        </div>
        <div style={{ maxWidth: '350px', width: '100%', marginLeft: '-30px' }}>
          <uc-stock-price stock-symbol='AAPL'></uc-stock-price>
          <uc-stock-finder></uc-stock-finder>
        </div> */}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
