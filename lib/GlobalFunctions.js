// const getUniqueCollection = (arr, compareKey) => {
//   return arr.filter((val, i) => arr.findIndex((valInd) => valInd[compareKey] === val[compareKey])
//   );
// };
import ReactDOMServer from "react-dom/server";
// import myPdf from '../public/pdf/mycertificate.pdf'; // Adjust the path as needed
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const getUniqueCollection = (arr, compareKey) => {};
const progressNumber = (questionLength) => {
  const result = Math.ceil(100 / questionLength);
  return result;
};
const getScorePercentage = (score, total) => {
  let result = (score / total) * 100;
  if (isNaN(result) || typeof result !== "number") {
    return 0;
  } else {
    return result.toFixed(1);
  }
};
const handleCopyPaste = (e) => {
  e.preventDefault(); // Prevent the default copy and paste behavior
};
const filterDuplicates = (arr) => {
  return arr.filter((obj, index, self) => {
    const title = obj.sys.contentType.sys.id; // Change this to the property you want to use as the identifier
    return index === self.findIndex((o) => o.sys.contentType.sys.id === title);
  });
};

const getObjectKey = (obj) => {
  if (obj) {
    return Object.keys(obj)[0];
  }
};

const getQuestionLeftModule = (data, collectionType, givenCount) => {
  const collection = data.allQuizes[collectionType][data.quizInfo.activeStep];
  // .length - givenCount;
  if (collectionType === "audioQuestions") {
    return collection.length - givenCount;
  } else {
    const key = getObjectKey(collection);
    return collection[key].length - givenCount;
  }
};
const sendEmail = async (email, message) => {
  const emailData = {
    email,
    subject: "Your Certificate",
    message,
  };
  try {
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Email sent successfully:", data.message);
    } else {
      console.error("Error sending email:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const resultCheckApi=async(userScoreCollection)=>{
  
    const response = await fetch("/api/contentfulQueries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(userScoreCollection)
    });
    const res=await response.json()
    return res
  
}
const emailTemplate = (name, link) => {
  const jsxTemplate = (
    <div>
      <h1>Hi {name}, This is your Certificate Link </h1>
      <h3>Link : </h3>
      {link}
    </div>
  );

  const emailContent = ReactDOMServer.renderToString(jsxTemplate);

  return emailContent;
};
const emailTemplateCollection = (name, data) => {
  const collection = data.map((val, index) => (
    <div key={index}>
      <h3>Issue Date: {val.date}</h3>
      <h3>Link : {val.link} </h3>
    </div>
  ));
  let jsxTemplate = (
    <div>
      <h2>Hi {name}, This is your Certificate Link </h2>

      {collection}
    </div>
  );

  const emailContent = ReactDOMServer.renderToString(jsxTemplate);

  return emailContent;
};
function formatTimestampToDateTime(timestamp) {
  // Convert the timestamp to a JavaScript Date object
  const date = new Date(timestamp?.seconds * 1000); // Multiply by 1000 to convert from seconds to milliseconds

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDateTime = `${day}-${month}-${year}`;

  return formattedDateTime;
}
export default {
  formatTimestampToDateTime,
  emailTemplate,
  getUniqueCollection,
  progressNumber,
  getScorePercentage,
  handleCopyPaste,
  filterDuplicates,
  getObjectKey,
  getQuestionLeftModule,
  sendEmail,
  emailTemplateCollection,
  resultCheckApi
};
