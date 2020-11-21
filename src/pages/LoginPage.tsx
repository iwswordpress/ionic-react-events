import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
  IonText,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonModal,
  IonCheckbox
} from '@ionic/react';

import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import './HomePage.css';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });
  const [showModal, setShowModal] = useState(false);
  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.signInWithEmailAndPassword(email, password);
      //setStatus({ loading: false, error: false });
      console.log('credential:', credential);
      console.log(
        `EMAIL ${credential.user.email} with ID of ${credential.user.uid}`
      );
      //onLogin();
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('error:', error);
    }
  };

  if (loggedIn) {
    return <Redirect to='/my/entries' />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex' }}>
            <IonTitle>Login</IonTitle>
            <IonIcon
              icon={wifi}
              style={{ fontSize: '45px', color: 'green', margin: '20px' }}
            />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList>
          <IonItem>
            <IonLabel position='stacked'>Email</IonLabel>
            <IonInput
              type='email'
              value={email}
              onIonChange={event => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Password</IonLabel>
            <IonInput
              type='text'
              value={password}
              onIonChange={event => setPassword(event.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && <IonText color='danger'>Invalid credentials</IonText>}
        <IonButton expand='block' onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton expand='block' fill='clear' routerLink='/register'>
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Site Policy</IonCardTitle>
              <IonCardSubtitle>The small print</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent className='test'>
              Keep close to Nature's heart... and break clear away, once in
              awhile, and climb a mountain or spend a week in the woods. Wash
              your spirit clean.
            </IonCardContent>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <IonButton onClick={() => setShowModal(true)}>
                Show Modal
              </IonButton>
            </div>
          </IonCard>

          <IonModal isOpen={showModal}>
            <div style={{ margin: '30px', width: '300px' }}>
              This is modal content
            </div>
            <IonButton
              onClick={() => setShowModal(false)}
              style={{ marginBottom: '350px' }}
            >
              Close Modal
            </IonButton>
          </IonModal>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
