import firebase_app from "../config";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import myPdf from "../../../public/pdf/mycertificate.pdf"

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query, where,updateDoc,addDoc
} from "firebase/firestore";
const db = getFirestore(firebase_app);
const storage = getStorage();
async function createPdf(name) {
  try {
    // Generate the PDF as you were doing
    // Load the PDF file using a relative path
    const pdfBytes = await fetch(myPdf).then((res) => res.arrayBuffer());
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(name, {
      x: 290,
      y: 300,
      size: 40,
      color: rgb(0, 0, 0),
    });

    const pdfBytesModified = await pdfDoc.save();

    // Specify the desired filename with .pdf extension
    const customFilename = 'certificate.pdf';

    // Create a reference to the PDF file in Firebase Cloud Storage with the custom filename
    const pdfFileRef = ref(storage, `pdfs/${customFilename}`);

    // Upload the PDF file
    await uploadBytes(pdfFileRef, pdfBytesModified);

    console.log('PDF uploaded successfully');

    // Get the download URL for the uploaded PDF
    const pdfUrl = await getDownloadURL(pdfFileRef) + "?inline=true";

    // Save the custom link in Firestore
    const data = {
      link: pdfUrl,
    };
    const { id, error } = await addLink('pdfs', data);
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Data added with ID:', id);
    }
    console.log("data",data)
    return data

    // Open the PDF in a new tab (you can also trigger a download)
    window.open(pdfUrl, '_blank');

    console.log('PDF manipulation complete.');
  } catch (error) {
    console.error('Error:', error);
  }
}
async function addLink(collectionName, data) {
  try {
    // Add the data to the collection
    const docRef = await addDoc(collection(db, collectionName), data);
    
    // Return the auto-generated ID
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error };
  }
}
const addData = async (collection, id, data) => {
  let result = null;
  let error = null;
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
  updateUserScore,
  createPdf
};
