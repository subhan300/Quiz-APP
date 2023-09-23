// const getUniqueCollection = (arr, compareKey) => {
//   return arr.filter((val, i) => arr.findIndex((valInd) => valInd[compareKey] === val[compareKey])
//   );
// };
const getUniqueCollection = (arr, compareKey) => {};

const progressNumber = (questionLength) => {
  const result = Math.ceil(100 / questionLength);
  return result;
};
const getScorePercentage = (score, total) => {
  return (score * 100) / total;
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
export default {
  getUniqueCollection,
  progressNumber,
  getScorePercentage,
  handleCopyPaste,
  filterDuplicates,
  getObjectKey,
  getQuestionLeftModule,
  sendEmail
};
