"use client";
import { useEffect, useState } from "react";
import contentful, { client } from "../../lib/contentful";
import Head from "next/head";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import stylesheet from "../styles/Home.module.css";
import { Actions, State } from "@/context/context";
import Certificate from "@/components/certificate";
import Solution from "@/components/solution";
import Footer from "@/components/footer";
import QuizCard from "@/components/QuizCard";
import queries from "../firebase/firestore/queries";
import PageWithTabWarning from "@/components/PageWithTabWarning";
import ReadingQuestion from "@/components/readingQuestion";
import styled from "styled-components";
export default function Home({ posts, allQuizes }) {
  const [quizes, setQuizes] = useState([]);
  const quizState = State();
  const theme = useTheme();

  useEffect(() => {
    setQuizes(posts);
  }, []);
  const val = {
    answer: "Java",
    options: ["Java", "Python", "C++", "JavaScript"],
    question: "Which of the following programming languages do you know?",
    type: "dropdown",
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div style={{padding:"1rem",backgroundColor:"white"}}>
    {/* <CssTextField /> */}
    {/* <RedditTextField variant="filled" /> */}
    {/* <TextField variant="standard" 
    
  /> */}
  <TextField variant="standard"  id="standard-basic"  placeholder="SX" />
    </div>
      {/* <div style={{backgroundColor:"white",padding:"3rem",width:'40%'}}>
      <ReadingQuestion
        allInfo={val}
        question={val.question}
        options={val.options}
        questionCategory={"reading"}
        userQuizHandler={()=>{}}
        id={val.question}
      />
      </div> */}
      <div className={stylesheet.homeBx}>
        <div>
          <Certificate />
        </div>
        <div>
          <Solution />
        </div>

        <Grid container spacing={4} className={stylesheet.inner__grid}>
          {quizes?.map((cardData, index) => {
            cardData = {
              ...cardData,
              min: "15",
              testType: "quick check",
              subHeading: "Check your English level",
              items: [
                "No fees, No sign up, Start now",
                "Beginner, intermediate, and advanced",
                "Share your score on social media",
              ],
              navText: "quiz details",
            };
            return (
              <Grid item xs={12} sm={4} key={index}>
                <QuizCard
                  cardData={{
                    min: cardData.fields.isQuiz ? 50 : 12,
                    testType: cardData.fields.isQuiz ? "Quiz" : "Quick Check",
                    subHeading: cardData.fields.title,
                    items: ["Quiz", "Skills"],
                    index: 2,
                    navText: "Quiz Details",
                    fields: {
                      slug: cardData.fields.slug,
                    },
                    contentType: "levelC",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Footer />
    </>
  );
}

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'orange',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'yellow',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'yellow',
      border:"1px solid black"
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
})
const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    // backgroundColor:'red',
    border: '1px solid',
    // borderColor:'red',
   
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `red 0 0 0 2px`,
      borderColor:'green',
    },
    
    '&.MuiFilledInput-multiline':{
      border:"1px solid yellow"
      }
  },
}));
export const getStaticProps = async () => {
  // const posts = await client.getEntries();
  // const posts = await contentful.getSingleBlogPost('quiz-B');

  const posts = await contentful.getEntryByContentType("levelC");
  const allQuizes = await contentful.fetchEntries();

  return { props: { posts, allQuizes } };
};
