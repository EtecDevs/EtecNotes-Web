import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBTwYLOnCJAEqDAxxJGn_Yb1XnD0u1XWl0",
    authDomain: "etecnotes.firebaseapp.com",
    projectId: "etecnotes",
    storageBucket: "etecnotes.firebasestorage.app",
    messagingSenderId: "924625537431",
    appId: "1:924625537431:web:e2d48df0d1595ebd07dcd2",
    measurementId: "G-Z60JPWRNX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;