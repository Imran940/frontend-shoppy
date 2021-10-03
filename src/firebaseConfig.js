import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBXA0XhaW2FN6ucHT9GJ_WJyZCqdTZI8MQ",
  authDomain: "e-commerce-e23ba.firebaseapp.com",
  projectId: "e-commerce-e23ba",
  storageBucket: "e-commerce-e23ba.appspot.com",
  messagingSenderId: "646991029149",
  appId: "1:646991029149:web:da46e19e02630695650574",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
