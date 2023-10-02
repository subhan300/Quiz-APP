import firebase_app from "../config";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import certificate from "../../../public/pdf/test-certificate.pdf";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import GlobalFunctions from "../../../lib/GlobalFunctions";
const db = getFirestore(firebase_app);
const storage = getStorage();

async function createPdf(
  name,
  listening,
  listeningScore,
  reading,
  readingScore,
  testName,
  score,
  date
) {
  try {
    // Generate the PDF as you were doing
    // Load the PDF file using a relative path
    const pdfBytes = await fetch(certificate).then((res) => res.arrayBuffer());
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(name, {
      x: 235,
      y: 770,
      // increase go up
      size: 22,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(score, {
      x: 280,
      y: 590,
      // increase go up
      size: 16,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(testName, {
      x: 250,
      y: 610,
      // increase go up
      size: 16,
      color: rgb(0, 0, 0),

     
    });
    firstPage.drawText(listening, {
      x: 90,
      y: 220,
      // increase go up
      size: 20,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(listeningScore, {
      x: 90,
      y: 202,
      // increase go up
      size: 16,
      color: rgb(1, 0, 0),
    });
    firstPage.drawText(reading, {
      x: 355,
      y: 220,
      // increase go up
      size: 20,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(readingScore, {
      x: 355,
      y: 202,
      // increase go up
      size: 16,
      color: rgb(1, 0, 0),
    });
    // firstPage.drawText(date, {
    //   x: 260,
    //   y: 490,
    //   size: 13,
    //   color: rgb(0, 0, 0),
    // });
    // const blob = new Blob([pdfBytesModified], { type: "application/pdf" });
    // const pdfDataUrl = URL.createObjectURL(blob);
    const pdfBytesModified = await pdfDoc.save();

        // Specify the desired filename with .pdf extension
        const customFilename = `${name}.pdf`
        // Create a reference to the PDF file in Firebase Cloud Storage with the custom filename
        const pdfFileRef = ref(storage, `pdfs/${customFilename}`);
        await uploadBytes(pdfFileRef, pdfBytesModified);
        // console.log("PDF uploaded successfully");
        const pdfUrl = (await getDownloadURL(pdfFileRef)) + "?inline=true";
        // window.open(pdfUrl)
        return {link:pdfUrl}
    // window.open(pdfDataUrl, "_blank");
  } catch (error) {
    console.error("Error:", error);
  }
}

const addData = async (collection, id, data, isQuiz,certificatePayload) => {
  let result = null;
  let error = null;
  try {
    let name = data?.firstName + data.lastName;
    let temperNewScore = { ...data };
    if (isQuiz) {
      const certificateGenerate = await createPdf(name,...certificatePayload);
      (temperNewScore = {
        ...temperNewScore,
        result: [
          {
            ...temperNewScore.result[0].userScore,

            certificateLink: certificateGenerate.link,
            date: new Date(),
          },
        ],
      }),
        GlobalFunctions.sendEmail(
          data.email,
          GlobalFunctions.emailTemplate(name, certificateGenerate.link)
        );
    }

    result = await setDoc(doc(db, collection, id), temperNewScore, {
      merge: true,
    });

    return "success";
  } catch (e) {
    error = e;
    return error;
  }
};
// Create a function to update the userScore array
const updateUserScore = async (userId, prevData, newScore, isQuiz, user,certificatePayload) => {
  try {
    let temperNewScore = { ...newScore };
    if (isQuiz) {
      // Combine the previous userScore array with the new score
      let name = user?.firstName + user.lastName;
      
      const certificateGenerate = await createPdf(name,...certificatePayload);
      temperNewScore = {
        ...temperNewScore,
        certificateLink: certificateGenerate?.link,
        date: new Date(),
      };
      GlobalFunctions.sendEmail(
        user.email,
        GlobalFunctions.emailTemplate(name, certificateGenerate?.link)
      );
    }
    const updatedUserScore = [...prevData, temperNewScore];

    // Update the userScore array in the Firestore document
    const userRef = doc(db, "users", userId);
    const updateResult = await updateDoc(userRef, {
      result: updatedUserScore,
    });

    return "success";
  } catch (error) {
    console.error("Error updating userScore:", error);
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
    const q = query(collection(db, "users"), where("email", "==", email)); // Create the query

    const querySnapshot = await getDocs(q); // Execute the query

    if (!querySnapshot.empty) {
      const userData = [];
      querySnapshot.forEach((doc) => {
        // User data is available in doc.data()
        userData.push({ ...doc.data(), id: doc.id });
      });
      return userData;
    } else {
      console.log("No user found with the specified email.");
      return null;
    }
  } catch (error) {
    console.error("Error querying Firestore:", error);
    return null;
  }
};

export default {
  addData,
  getData,
  findDataExist,
  updateUserScore,
  createPdf,
};
