import firebase_app from "../config";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query, where,updateDoc
} from "firebase/firestore";
const db = getFirestore(firebase_app);
const addData = async (collection, id, data) => {
  let result = null;
  let error = null;
 debugger
  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
    return "success"
  } catch (e) {
    error = e;
    return error;
  } 
  
};
// Create a function to update the userScore array
const updateUserScore = async (userId, prevData, newScore) => {
    try {
      // Combine the previous userScore array with the new score
      const updatedUserScore = [...prevData, newScore];
  
      // Update the userScore array in the Firestore document
      const userRef = doc(db, 'users', userId);
    const updateResult=await updateDoc(userRef, {
        result: updatedUserScore,
      });
    return "success"
    } catch (error) {
      console.error('Error updating userScore:', error);
    }
  };
  
const getData = async (collectionName) => {
  let result = [];
  let error = null;
  try {
    let querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    error = e;
  } finally {
    return { result, error };
  }
};

const findDataExist = async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email)); // Create the query
      
      const querySnapshot = await getDocs(q); // Execute the query
      
      if (!querySnapshot.empty) {
        const userData = [];
        querySnapshot.forEach((doc) => {
          // User data is available in doc.data()
          userData.push({ ...doc.data(), id: doc.id });
        });
        return userData;
      } else {
        console.log('No user found with the specified email.');
        return null;
      }
    } catch (error) {
      console.error('Error querying Firestore:', error);
      return null;
    }
  };

  
export default {
  addData,
  getData,
  findDataExist,
  updateUserScore
};
