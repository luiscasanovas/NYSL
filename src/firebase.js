// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrGCuGm7MSUJ_a388ZL6AecAjKIFICz_s",
  authDomain: "nysl-6fd68.firebaseapp.com",
  projectId: "nysl-6fd68",
  storageBucket: "nysl-6fd68.appspot.com",
  messagingSenderId: "327562731417",
  appId: "1:327562731417:web:9ce966d723d3ec4cc2fd08",
  measurementId: "G-54EE9YS6H6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  
const googleAuthProvider = new GoogleAuthProvider();
const signInWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider);
};
const signOutUser = () => {
  return signOut(auth);
};
export { auth, signInWithGoogle, signOutUser, analytics };

