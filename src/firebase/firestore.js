import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import app from '../../firebase';

const db = getFirestore(app);

// Create or update user document
export const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        email,
        createdAt,
        name: user.displayName || email.split('@')[0] // Use displayName or fallback to email username
      });
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }

  return userRef;
};

// Get user document
export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return { uid, ...snapshot.data() };
    }
  } catch (error) {
    console.error('Error fetching user document:', error);
    throw error;
  }

  return null;
};
