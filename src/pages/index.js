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
} from "@mui/material";
import stylesheet from "../styles/Home.module.css";
import { Actions, State } from "@/context/context";
import Certificate from "@/components/certificate";
import Solution from "@/components/solution";
import Footer from "@/components/footer";
import QuizCard from "@/components/QuizCard";
import queries from "../firebase/firestore/queries";
import PageWithTabWarning from "@/components/PageWithTabWarning";
export default function Home({ posts, allQuizes }) {
  const [quizes, setQuizes] = useState([]);
  const quizState = State();
  const theme = useTheme();

  useEffect(() => {
    setQuizes(posts);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
export const getStaticProps = async () => {
  // const posts = await client.getEntries();
  // const posts = await contentful.getSingleBlogPost('quiz-B');

  const posts = await contentful.getEntryByContentType("levelC");
  const allQuizes = await contentful.fetchEntries();

  return { props: { posts, allQuizes } };
};
