import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyD9ZZimBlO_TOsK-ful0z9jWXmQBxlUwgY",
  authDomain: "vue-chat-2c792.firebaseapp.com",
  databaseURL: "https://vue-chat-2c792-default-rtdb.firebaseio.com",
  projectId: "vue-chat-2c792",
  storageBucket: "vue-chat-2c792.appspot.com",
  messagingSenderId: "189371833610",
  appId: "1:189371833610:web:5ea461f4225cd29e542ef3"
};
// Initialize Firebase
const myApp = firebase.initializeApp(firebaseConfig);
myApp.firestore().settings({ timestampsInSnapshots: true });

export default myApp.firestore();
