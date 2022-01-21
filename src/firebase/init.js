import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
const myApp = firebase.initializeApp(firebaseConfig);
myApp.firestore().settings({ timestampsInSnapshots: true });

export default myApp.firestore();