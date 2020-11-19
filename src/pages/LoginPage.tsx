import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import './HomePage.css';
interface Props {
  onLogin: () => void;
}
const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const { loggedIn } = useAuth();

  const handleLogin = async () => {
    const credential = await auth.signInWithEmailAndPassword(
      'test1@example.org',
      'test1234'
    );
    onLogin();
    console.log('credential:', credential);
    console.log('USER: ', credential.user.email, 'ID: ', credential.user.uid);
  };

  if (loggedIn) {
    return <Redirect to='/my/entries' />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonButton expand='block' onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
