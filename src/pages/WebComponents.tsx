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
const WebComponents: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Web Components</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WebComponents;
