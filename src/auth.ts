import React, { useContext, useEffect, useState } from 'react';
import { auth as firebaseAuth } from './firebase';

interface Auth {
  loggedIn: boolean;
  userId?: string;
}
interface AuthInit {
  loading: boolean;
  auth?: Auth;
}
export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({
    loading: true
  });

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(
          'Firebase User exists:',
          firebaseUser.email,
          firebaseUser.uid
        );
      }
      console.log('onAuthStateChanged - firebaseUser:', firebaseUser);
      const auth = firebaseUser
        ? { loggedIn: true, userId: firebaseUser.uid }
        : { loggedIn: false };
      console.log('auth:', auth);
      setAuthInit({
        loading: false,
        auth
      });
    });
  }, []);
  return authInit;
}
