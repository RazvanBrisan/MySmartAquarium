import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDepqFZgb7jkORSYxBQqCuoG1o5FQwpDmo",
  authDomain: "mysmartaquarium-eba5c.firebaseapp.com",
  projectId: "mysmartaquarium-eba5c",
  storageBucket: "mysmartaquarium-eba5c.appspot.com",
  messagingSenderId: "777095503418",
  appId: "1:777095503418:web:197a7242cc11cbc6fd1f03"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


export { auth};

