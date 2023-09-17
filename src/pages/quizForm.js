import Head from "next/head";
import stylesheet from "../styles/quizForm.module.css";
import Header from "@/components/header";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useFormik } from "formik";
import formSchema from "../../lib/formSchema";
import { useEffect } from "react";
import { Actions, State } from "@/context/context";
import { useRouter } from "next/router";
import queries from "@/firebase/firestore/queries";

export default function NextQuestion() {
  const result = { listening: 0, audio: 0 };
  const contextState = State();
  const { userScore } = contextState;
  const { quizInfo } = contextState;

  const action = Actions();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "subhan",
      lastName: "s",
      yearOfBirth: "s",
      email: "qa2+automationuser@thiswayglobal.com",
      country: "s",
      city: "s",
      gender: "s",
      phone: "s",
      result: [{ userScore }],
    },
    validationSchema: formSchema.validationSchema,
    onSubmit: async (values) => {
      filterResult();
      action.setUserFormSubmit(true);
      const userExist = await queries.findDataExist(values.email);
      handleForm(values, userExist);
     
    },
  });
 
  const sendEmail = async (email,message) => {
  const emailData=  {
      email,
      subject: 'Your Certificate',
      message,
    }
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Email sent successfully:', data.message);
      } else {
        console.error('Error sending email:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  const getQuestionLeft = (data, category) => {

    let questionCategory = "";
    if (category === "reading") {
      questionCategory = "readingQuestionsLength";
    } else if (category === "listening") {
      questionCategory = "listeningQuestionLength";
    }
    const questionLeft =
      quizInfo.ALLQuestionsTotalNumber[questionCategory] - data.length;
    action.handleUserScore({
      allQuizUserDetail: [],
      questionLeft: { [category]: questionLeft },
    });
    return questionLeft;
  };
  const filterResult = () => {
    let readingCollection = [];
    let listeningCollection = [];
    for (const obj of userScore.allQuizUserDetail) {
      if (obj.questionCategory === "reading") {
        readingCollection.push(obj);
      } else {
        listeningCollection.push(obj);
      }
    }

    const listening = calculateResult(listeningCollection, "listening");

    const reading = calculateResult(readingCollection, "reading");
    action.setResult({ listening, reading });
  };

  const calculateResult = (collection, category) => {
    let result = collection.reduce((acc, val) => acc + val.score, 0);

    const questionLeft = getQuestionLeft(collection, category);
    const score = result - questionLeft * 10;
    result = score > 0 ? score : 0;
    return result;
  };
  const handleForm = async (data, userExist) => {
    if (userExist?.length) {
      const updateResult=await queries.updateUserScore(
        userExist[0].id,
        userExist[0].result,
        userScore
      );
      if(updateResult==="success"){
        sendEmail(userExist[0].email,"Hi ,recieve your certificate")
        router.push("/quizResult");
        return updateResult
       
      }else{
        alert("issue in backend , plz submit response again")
       }
  
      
    }
    const addData= await queries.addData("users", data.email, data);
     if(addData==="success"){
      sendEmail(data.email,"Hi ,recieve your certificate")
      router.push("/quizResult");
     }else{
      alert("issue in backend , plz submit response again")
     }
    
  };
  useEffect(() => {
    !Boolean(quizInfo.isQuizQuestionDone) ||
    !Boolean(quizInfo.isQuizListeningDone)
      ? router.push("/")
      : "";
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!Boolean(quizInfo.isQuizQuestionDone) ||
      !Boolean(quizInfo.isQuizListeningDone) ? (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
            color: "red",
          }}
        >
          Attempt the Quiz First
        </h1>
      ) : (
        <div className={stylesheet.page_body}>
          <div className={stylesheet.cardBx}>
            <Card className={stylesheet.card}>
              <CardContent>
                <h1>You're almost there…</h1>
                <p>
                  Before viewing your test score, please tell us more about
                  yourself. This information will only be used for academic
                  research purposes on language learning.
                </p>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    className={stylesheet.text__field}
                    id="firstName"
                    label="First name(s)"
                    variant="outlined"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                  <TextField
                    className={stylesheet.text__field}
                    id="lastName"
                    label="Last name(s)"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                  <TextField
                    className={stylesheet.text__field}
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    className={stylesheet.text__field}
                    id="yearOfBirth"
                    label="Year of Birth"
                    variant="outlined"
                    value={formik.values.yearOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.yearOfB && Boolean(formik.errors.yearOfB)
                    }
                    helperText={formik.touched.yearOfB && formik.errors.yearOfB}
                  />
                  <TextField
                    className={stylesheet.text__field}
                    id="country"
                    label="Country"
                    variant="outlined"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={formik.touched.country && formik.errors.country}
                  />
                  <TextField
                    className={stylesheet.text__field}
                    id="city"
                    label="City"
                    variant="outlined"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                  <TextField
                    className={stylesheet.text__field}
                    id="gender"
                    label="Gender"
                    variant="outlined"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                    helperText={formik.touched.gender && formik.errors.gender}
                  />
                  <TextField
                    className={stylesheet.text__field}
                    id="phone"
                    label="Mobile Phone"
                    variant="outlined"
                    placeholder="optional"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                  <TextField
                    className={stylesheet.text__field}
                    id="online"
                    label="Prefered Learning Method"
                    variant="outlined"
                  />
                  <div className={stylesheet.btn__bx}>
                    <button type="submit" className={stylesheet.trans__Btn}>
                      View Results
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
