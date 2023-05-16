import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANVfNtp32yykjQcXxiz6uSBle4lBvGVx8",
  authDomain: "fir-forroutineapp.firebaseapp.com",
  databaseURL: "https://fir-forroutineapp-default-rtdb.firebaseio.com",
  projectId: "fir-forroutineapp",
  storageBucket: "fir-forroutineapp.appspot.com",
  messagingSenderId: "769641830991",
  appId: "1:769641830991:web:79bbda851a80c78218683a",
  measurementId: "G-PP4CLJ5LSM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { app, auth, database };
