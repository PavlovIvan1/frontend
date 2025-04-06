import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyCg256O2OrTl1Miwiiz34ftcIGTgiqurCM',
  authDomain: 'sptap-e74f0.firebaseapp.com',
  projectId: 'sptap-e74f0',
  storageBucket: 'sptap-e74f0.firebasestorage.app',
  messagingSenderId: '24208369231',
  appId: '1:24208369231:web:a0a6b73615f07fa669ac3a',
  measurementId: 'G-7Y58BC1J16',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
