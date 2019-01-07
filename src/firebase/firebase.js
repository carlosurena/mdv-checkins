import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBIlXA_W484Dolklt51bZK0ACPJsNTjbRU",
    authDomain: "mdv-administration.firebaseapp.com",
    databaseURL: "https://mdv-administration.firebaseio.com",
    projectId: "mdv-administration",
    storageBucket: "",
    messagingSenderId: "374724907189"
  };
   firebase.initializeApp(config);
   firebase.firestore().settings({timestampsInSnapshots: true})

   export default firebase;