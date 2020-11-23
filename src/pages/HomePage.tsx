import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem
} from '@ionic/react';
import React from 'react';

import './HomePage.css';
import { entries } from '../data';
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

        <my-component
          first-name='Craig'
          middle-name='George'
          last-name='West'
        ></my-component>

        <uc-stock-price stock-symbol='AAPL'></uc-stock-price>
        <uc-stock-finder></uc-stock-finder>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
