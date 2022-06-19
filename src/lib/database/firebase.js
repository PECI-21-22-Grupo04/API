import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBHQxQkZSV4t20FD3j5l6Uw04KxcE70zQM",
  authDomain: "runx-be658.firebaseapp.com",
  projectId: "runx-be658",
  storageBucket: "runx-be658.appspot.com",
  messagingSenderId: "84913934296",
  appId: "1:84913934296:web:39f8932c68556c41002cad",
  measurementId: "G-5ZR565TEEL"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);