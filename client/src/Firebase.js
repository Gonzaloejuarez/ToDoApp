// Import the functions you need from the SDKs you need
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOTcIsd5YzvvukIOYVov7DQ0b2aEAnAck",
  authDomain: "octopus-d3065.firebaseapp.com",
  projectId: "octopus-d3065",
  storageBucket: "octopus-d3065.appspot.com",
  messagingSenderId: "749079640383",
  appId: "1:749079640383:web:0ecd8ed4aa4a6c8f057b8a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export {storage, firebase as default}