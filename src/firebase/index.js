
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0HJuSRYS_CBM9UoiQ28AuNoPXnakGDro',
  authDomain: 'churchwebapplication.firebaseapp.com',
  projectId: 'churchwebapplication',
  storageBucket: 'churchwebapplication.appspot.com',
  messagingSenderId: '953904029313',
  appId: '1:953904029313:web:d16adfff6416e42ba37780'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore and create a db object

export { auth, googleProvider, db }; // Export auth, googleProvider, and db


/*

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0HJuSRYS_CBM9UoiQ28AuNoPXnakGDro',
  authDomain: 'churchwebapplication.firebaseapp.com',
  projectId: 'churchwebapplication',
  storageBucket: 'churchwebapplication.appspot.com',
  messagingSenderId: '953904029313',
  appId: '1:953904029313:web:d16adfff6416e42ba37780'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

*/