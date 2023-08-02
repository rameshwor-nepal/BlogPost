
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAblh-z0l5hgF_2ZK7nlW3jYx1FX7ymidc",
  authDomain: "blog-post-63c3e.firebaseapp.com",
  projectId: "blog-post-63c3e",
  storageBucket: "blog-post-63c3e.appspot.com",
  messagingSenderId: "369486004483",
  appId: "1:369486004483:web:a40be6bd0d9debae976936"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();