import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBHs4kinzinFpMc8_fyAi0GhsXYQvX6D8M",
    authDomain: "mobile-auth-a6933.firebaseapp.com",
    projectId: "mobile-auth-a6933",
    storageBucket: "mobile-auth-a6933.appspot.com",
    messagingSenderId: "801320668131",
    appId: "1:801320668131:web:fac539327004090aaeaed6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export {auth, db}
