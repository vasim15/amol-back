import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB0UY9ocz2CF7GHod9rMUlUJ-p9_NeP38U',
  authDomain: 'project-2-a7ed4.firebaseapp.com',
  projectId: 'project-2-a7ed4',
  storageBucket: 'project-2-a7ed4.appspot.com',
  messagingSenderId: '427985372865',
  appId: '1:427985372865:web:0fcf8ec330a703e8237640',
  measurementId: 'G-8E2SCD9ML5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
