import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyD0qev7_nx_TkcdSz-WwOIf8GoqIbe7i7o",
    authDomain: "facebook-message-40c04.firebaseapp.com",
    projectId: "facebook-message-40c04",
    storageBucket: "facebook-message-40c04.appspot.com",
    messagingSenderId: "1028399297120",
    appId: "1:1028399297120:web:96d5a24f62cee7595e8905"
  }).auth();