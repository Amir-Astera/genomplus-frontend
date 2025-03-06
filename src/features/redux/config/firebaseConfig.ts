// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyATM8Wo3YZaE9gVeuthLEczg4Y63dE5_mA",
    authDomain: "genompluslab-84d7d.firebaseapp.com",
    projectId: "genompluslab-84d7d",
    storageBucket: "genompluslab-84d7d.firebasestorage.app",
    messagingSenderId: "83156068356",
    appId: "1:83156068356:web:9d44baff55cbd1129a6d51"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// RecaptchaVerifier тоже экспортируем, чтобы использовать в компонентах
export { RecaptchaVerifier };