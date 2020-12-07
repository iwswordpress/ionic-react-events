import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';

import './WebComponents.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iws-stock-finder': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
    interface IntrinsicElements {
      'iws-wordpress': React.DetailedHTMLProps<
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
    // suggested but not needed
    // interface MyElementAttributes {
    //   'first-name': string;
    //   'middle-name': string;
    //   'last-name': string;
    // }
    // interface MyElementAttributes {
    //   'stock-symbol': string;
    // }
    interface IntrinsicElements {
      'iws-stock-price': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
const WebComponents: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Web Components</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <div style={{ marginTop: '30px', color: 'green', fontWeight: 'bold' }}>
          <my-component
            first-name='Craig'
            middle-name='George'
            last-name='West'
          ></my-component>
        </div>
        <div style={{ marginTop: '30px', color: 'green', fontWeight: 'bold' }}>
          <iws-worpdress />
        </div>
        <div style={{ maxWidth: '350px', width: '100%', marginTop: '10px' }}>
          <iws-stock-price stock-symbol='AAPL'></iws-stock-price>
          <iws-stock-finder></iws-stock-finder>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WebComponents;
