import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBbIMb5pljsOK7DpB3gi6ykckmVPqNBOoo",
  authDomain: "fakeai.firebaseapp.com",
  projectId: "fakeai",
  storageBucket: "fakeai.appspot.com",
  messagingSenderId: "484419710239",
  appId: "1:484419710239:web:0d74ff919e3cd464a9542a",
  measurementId: "G-NLGWLCZ8P5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { app, auth, database };
