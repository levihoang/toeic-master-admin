import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getRemoteConfig } from 'firebase/remote-config';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCRx08lqg64a3P3jOlGyJqTFOtIdUFlM-s',
  authDomain: 'toeic-capstone.firebaseapp.com',
  projectId: 'toeic-capstone',
  storageBucket: 'toeic-capstone.appspot.com',
  messagingSenderId: '1001315266819',
  appId: '1:1001315266819:web:204b9aaacdd2d5258a3936',
  measurementId: 'G-RWG6EST6FV'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
