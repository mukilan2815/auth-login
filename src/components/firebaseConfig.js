// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-1K9IsT5WbPuTVzJmzhkqkc4K_EW16Is",
  authDomain: "fir-sign-d7f9a.firebaseapp.com",
  projectId: "fir-sign-d7f9a",
  storageBucket: "fir-sign-d7f9a.appspot.com",
  messagingSenderId: "366069293471",
  appId: "1:366069293471:web:dc72c1c69e5fa932539daa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
