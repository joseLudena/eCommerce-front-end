"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/firebase";

const provider = new GoogleAuthProvider();
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
         setUser(firebaseUser);
         setLoading(false);
      });
      return unsubscribe;
   }, []);

   const loginWithGoogle = () => {
      return signInWithPopup(auth, provider);
   };

   const logout = () => {
      return signOut(auth);
   };

   return (
      <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
         {!loading && children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);