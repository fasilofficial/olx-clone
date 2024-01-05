import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbj8cTa877j9DKkWlwm8chVI715v15Jlk",
  authDomain: "fasils-olx-clone.firebaseapp.com",
  projectId: "fasils-olx-clone",
  storageBucket: "fasils-olx-clone.appspot.com",
  messagingSenderId: "392215753304",
  appId: "1:392215753304:web:dd259c5931a8041221d02d",
  measurementId: "G-Q68CQBRTQ1",
};

export default firebase.initializeApp(firebaseConfig);
