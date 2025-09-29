import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBTwYLOnCJAEqDAxxJGn_Yb1XnD0u1XWl0",
    authDomain: "etecnotes.firebaseapp.com",
    projectId: "etecnotes",
    storageBucket: "etecnotes.firebasestorage.app",
    messagingSenderId: "268058028102",
    appId: "1:268058028102:web:4d953d3a48b7f2e6dff8bf",
    measurementId: "G-GNHEMZSM1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



export default app;