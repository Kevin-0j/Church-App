import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0HJuSRYS_CBM9UoiQ28AuNoPXnakGDro',
  authDomain: 'churchwebapplication.firebaseapp.com',
  projectId: 'churchwebapplication',
  storageBucket: 'churchwebapplication.appspot.com',
  messagingSenderId: '953904029313',
  appId: '1:953904029313:web:d16adfff6416e42ba37780'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
