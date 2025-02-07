// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update, remove} from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCypWoVVWyz1aeucjnQGywhYBZ4t9Nlu0g",
  authDomain: "fairshare-nu.firebaseapp.com",
  projectId: "fairshare-nu",
  storageBucket: "fairshare-nu.firebasestorage.app",
  messagingSenderId: "839090248094",
  appId: "1:839090248094:web:47d3f66c45a39e67e31e8f",
  measurementId: "G-CEFKXL9NM8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase)
const database = getDatabase(firebase);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebase), (user) => {
      setUser(user);
      setLoading(false);
    })
    return () => unsubscribe();
  }, []);

  return [user, loading];
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    });

    return () => unsubscribe();
  }, [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = () => {
  const [result, setResult] = useState();
  // We remove the path parameter since we’ll pass complete update objects
  const updateData = useCallback((updates) => {
    // Updates should be an object containing all the paths and their values
    return update(ref(database), updates)
      .then(() => {
        const successResult = makeResult();
        setResult(successResult);
        return successResult;
      })
      .catch((error) => {
        const errorResult = makeResult(error);
        setResult(errorResult);
        throw error;
      });
  }, [database]); // Only depend on database instance
  return [updateData, result];
};



export const useDbRemove = (path) => {
  const [result, setResult] = useState();
  const removeData = useCallback(() => {
      remove(ref(database, path))
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [removeData, result];
};


