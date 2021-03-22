import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB30QzctHKL-MFaelIql7gc0EJ0FC4BsE4",
  authDomain: "marketlista.firebaseapp.com",
  projectId: "marketlista",
  storageBucket: "marketlista.appspot.com",
  messagingSenderId: "552035732055",
  appId: "1:552035732055:web:2e8a7bb9c14c7698877112",
  measurementId: "G-27XP9K4E2Q",
};

const fireb = firebase.initializeApp(firebaseConfig);
const store = fireb.firestore();
export { store };
