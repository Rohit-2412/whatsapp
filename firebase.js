import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, } from "firebase/storage";
import { initializeApp } from "firebase/app"

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };