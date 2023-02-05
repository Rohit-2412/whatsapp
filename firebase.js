import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCCy0dQl5d-CVuDTyIdv5WPEMyMIx_E3Kg",
    authDomain: "whatsapp-fc2e9.firebaseapp.com",
    projectId: "whatsapp-fc2e9",
    storageBucket: "whatsapp-fc2e9.appspot.com",
    messagingSenderId: "1020882641564",
    appId: "1:1020882641564:web:bba04bb64ab86208e70359",
    measurementId: "G-NBWYGJQ29B"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };