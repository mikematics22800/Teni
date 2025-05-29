import app from '../../firebase'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';

const auth = getAuth(app); 

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  if (typeof window === 'undefined') return;
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password) => {
  if (typeof window === 'undefined') return;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  if (typeof window === 'undefined') return;
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  if (typeof window === 'undefined') return;
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  return auth?.currentUser;
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!auth?.currentUser;
};
