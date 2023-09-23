import Head from "next/head";
import stylesheet from "../styles/quizResult.module.css";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import Image from "next/image";
import { State } from "@/context/context";
import GlobalFunctions from "../../lib/GlobalFunctions";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

import QuizLayout from "@/components/QuizLayout";

const data = [
  {
    image: 'https://cdn.efset.org/efset-widget/img/combined_efset_0_2x.png',
    subHeading: "Try our speaking test",
    text: "Test your fluency and pronunciation in 15 minutes with our new speaking test!",
    navText: "quiz details",
  },
  {
    image: 'https://cdn.efset.org/efset-widget/img/combined_efset_0_2x.png',
    subHeading: "Get your EF SET Certificate",
    text: "Take the 50-minute EF SET to receive your personalized English certificate URL to add to your LinkedIn profile or CV.",
    navText: "text details",
  },
];

export default function QuiaResult() {
  const { userScore, userFormSubmit } = State();
  const router = useRouter();
  const totalMarks = userScore.listening + userScore.reading;
  const total = 20;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!!userFormSubmit ? (
        <Loader />
      ) : (
        <div className={stylesheet.page_body}>
          <div className={stylesheet.result__grid}>
            <div>
              <div className={stylesheet.result__progressBar}>
                <h1>your score</h1>
                <p>Beginner</p>
                <div className={stylesheet.result__progress}>
                  <CircularProgress
                    sx={{
                      color: "white",
                      marginBottom: "1rem",
                      marginTop: "2rem",
                    }}
                    thickness={2}
                    size="14rem"
                    variant="determinate"
                    value={86}
                  />
                  <span className={stylesheet.progress__value}>
                    {GlobalFunctions.getScorePercentage(totalMarks, total)}
                    <i className={stylesheet.progress}>%</i>
                  </span>
                </div>
              </div>
              <div className={stylesheet.share__resultBx}>
                <p>Share your score</p>
                <div className={stylesheet.social__iconsBx}>
                  <span>
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 8 19"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M12.186 8.672 18.743 .947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        clipRule="evenodd"
                      />
                      <path d="M3 5.012H0V15h3V5.012Z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className={stylesheet.result__detailsCont}>
              <div className={stylesheet.result__details}>
                <h1>Your score explained</h1>
                <p className={stylesheet.result__detailsPara}>
                  Your score indicates that your level is in the range of A1
                  BEGINNER to A2 ELEMENTARY, according to the guidelines set by
                  the Common European Framework of Reference (CEFR).
                </p>
                <p className={stylesheet.result__detailsPara}>
                  You are on your way to comprehending written and spoken
                  vocabulary and sentences on topics from your daily life.
                </p>
                <div className={stylesheet.que__result}>
                  <div className={stylesheet.que__resultLeft}>
                    <div className={stylesheet.result__progress}>
                      <CircularProgress
                        sx={{
                          color: "#8EAC79",
                          marginBottom: "1rem",
                          marginTop: "2rem",
                        }}
                        thickness={2}
                        size="5rem"
                        variant="determinate"
                        value={86}
                      />
                      <span className={stylesheet.que__value}>
                        {userScore.reading}
                        <i className={stylesheet.que__progress}>%</i>
                      </span>
                    </div>
                    <p className={stylesheet.que__level}>Intermediate</p>
                  </div>
                  <div className={stylesheet.que__resultRight}>
                    <div className={stylesheet.result__detailsBx}>
                      <h1>Reading Score</h1>
                    </div>
                    <p>
                      You understand the main points of more abstract written
                      texts, and you are able to infer meaning of some
                      unfamiliar vocabulary.
                    </p>
                  </div>
                </div>
                <div className={stylesheet.que__result}>
                  <div className={stylesheet.que__resultLeft}>
                    <div className={stylesheet.result__progress}>
                      <CircularProgress
                        sx={{
                          color: "#D67D41",
                          marginBottom: "1rem",
                          marginTop: "2rem",
                        }}
                        thickness={2}
                        size="5rem"
                        variant="determinate"
                        value={86}
                      />
                      <span className={stylesheet.que__value}>
                        {userScore.listening}
                        <i className={stylesheet.que__progress}>%</i>
                      </span>
                    </div>
                    <p className={stylesheet.que__level}>Beginner</p>
                  </div>
                  <div className={stylesheet.que__resultRight}>
                    <div className={stylesheet.result__detailsBx}>
                      <h1>Listening Score</h1>
                    </div>
                    <p>
                      You understand the general idea of conversations relevant
                      to you provided they are clearly communicated and using
                      high-frequency expressions.
                    </p>
                  </div>
                </div>
              </div>
              <div className={stylesheet.result__tableCont}>
                <h1 style={{ paddingLeft: ".6rem" }}>Quick check score table</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Beginner</th>
                      <th>Intermediate</th>
                      <th>Advanced</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>EF SET</th>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={stylesheet.result__tableCont}>
                <h1>Score comparison table</h1>
                <table>
                  <thead>
                    <tr>
                      <th>CEFR</th>
                      <th>A1</th>
                      <th>A2</th>
                      <th>B1</th>
                      <th>B2</th>
                      <th>C1</th>
                      <th>C2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>EF SET</th>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                    </tr>
                    <tr>
                      <th>TOEFL</th>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                    </tr>
                    <tr>
                      <th>IELTS</th>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                      <td>1-60%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h2 style={{ textAlign: "center" }}>Recommended for you</h2>
          <Grid container spacing={4} className={stylesheet.inner__grid}>
            {data.map((cardData, index) => (
              <Grid item xs={12} sm={7} md={4} key={index}>
                <Card>
                  <CardContent className={stylesheet.card__content}>
                    <div>
                      <Image
                        src={cardData.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="quiz result "
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <p className={stylesheet.card__subHeading}>
                      {cardData.subHeading}
                    </p>
                    <p className={stylesheet.card__itemsText}>
                      {cardData.text}
                    </p>
                    <div className={stylesheet.quizDetails__bx}>
                      <button className={stylesheet.quizDetails__btn}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 4.5C10.314 4.5 9 5.80455 9 7.35V12.15C9 13.6955 10.314 15 12 15C13.686 15 15 13.6955 15 12.15L15 7.35C15 5.80455 13.686 4.5 12 4.5ZM7.5 7.35C7.5 4.919 9.54387 3 12 3C14.4561 3 16.5 4.919 16.5 7.35L16.5 12.15C16.5 14.581 14.4561 16.5 12 16.5C9.54387 16.5 7.5 14.581 7.5 12.15V7.35ZM6.75 12.75C6.75 15.1443 9.0033 17.25 12 17.25C14.9967 17.25 17.25 15.1443 17.25 12.75H18.75C18.75 15.9176 16.0499 18.3847 12.75 18.7129V21H11.25V18.7129C7.95007 18.3847 5.25 15.9176 5.25 12.75H6.75Z"
                              fill="#080341"
                            ></path>{" "}
                          </g>
                        </svg>
                        {cardData.navText}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}

QuiaResult.getLayout = function getLayout(page) {
  return (
    <QuizLayout>
      {page}
    </QuizLayout>
  );
};
