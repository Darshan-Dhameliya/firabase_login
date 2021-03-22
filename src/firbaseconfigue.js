import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

// create a web app in fireabse
// then get your app config object from firebase console -> settings
const firebaseConfig = {
  apiKey: "AIzaSyAkjUTavw3QXumSDUyK3OdrajNjrbo0FDw",
  authDomain: "instamini-11a10.firebaseapp.com",
  databaseURL: "https://instamini-11a10-default-rtdb.firebaseio.com",
  projectId: "instamini-11a10",
  storageBucket: "instamini-11a10.appspot.com",
  messagingSenderId: "558099195026",
  appId: "1:558099195026:web:3fcf03e1ca8303c86db24b",
  measurementId: "G-M8206FCMJR",
};

firebase.initializeApp(firebaseConfig);
