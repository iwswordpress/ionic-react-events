import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon
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

    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
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
              {entry.title}
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
