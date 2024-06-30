// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHzvAKuUqjMhNNkwYjaqDqpFwXorLqu6A",
  authDomain: "radar-tasker.firebaseapp.com",
  databaseURL: "https://radar-tasker-default-rtdb.firebaseio.com",
  projectId: "radar-tasker",
  storageBucket: "radar-tasker.appspot.com",
  messagingSenderId: "578612123790",
  appId: "1:578612123790:web:c03c5598a0edc4992151df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };

