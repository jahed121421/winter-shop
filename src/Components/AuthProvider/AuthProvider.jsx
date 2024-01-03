import { createContext, useEffect, useState } from "react";
import React from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../../firebase.config";

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const SingUpWithEmailPassword = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SingInWithEmailPassword = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const SignInWithGoogle = () => {
    setLoading(false);
    return signInWithPopup(auth, provider);
  };

  const SignOut = () => {
    setLoading(false);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      return () => {
        unsubscribed();
      };
    });
  }, []);

  const data = {
    user,
    loading,
    setLoading,
    SingInWithEmailPassword,
    SingUpWithEmailPassword,
    SignInWithGoogle,
    SignOut,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
