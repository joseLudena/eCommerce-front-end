import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyCvNJaVvxa5_WnLPj5EQbHTxn285jyRt_c",
   authDomain: "ecommerce-e4941.firebaseapp.com",
   projectId: "ecommerce-e4941",
   storageBucket: "ecommerce-e4941.firebasestorage.app",
   messagingSenderId: "25249392870",
   appId: "1:25249392870:web:95347a1952980b53f6b327",
   measurementId: "G-SHM85V66FS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);