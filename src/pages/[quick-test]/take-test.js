"use client";
// import { useClient } from 'next/react-client';

// Use the useClient directive to indicate that this is a client-side component
// useClient();

import { Actions, State } from "@/context/context";
import { useRouter } from "next/router";
import React, { useEffect, useId, useRef, useState } from "react";
import contentfulApiFunctions from "../../../lib/contentful";
import ReadingQuestion from "@/components/readingQuestion";
import QuizWrapper from "@/components/QuizWrapper/QuizWrapper";
import TextMobileStepper from "@/components/Stepper";
import AudioTrackComponent from "@/components/AudioTrackComponent";

import styles from "../../styles/fixedSideLayout.module.css";
import { Box, Button, MobileStepper } from "@mui/material";
import FixedSideStepper from "@/components/FixedSideStepper";
import { KeyboardArrowRight } from "@mui/icons-material";
import GlobalFunctions from "../../../lib/GlobalFunctions";
import Loader from "@/components/Loader";
import { useInView } from "react-intersection-observer";
import NextQuestionCard from "@/components/NextQuestionCard";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PageWithTabWarning from "@/components/PageWithTabWarning";
import GridQuestion from "@/components/GridQuestion";
import TopSlideDrawer from "@/components/TopSlideDrawer";
import TopSliderDrawer from "@/components/TopSlideDrawer";
import DotBar from "@/components/DotBar";
import { useUID } from 'react-uid';
import Layout from "@/components/Layout";
import QuizLayout from "@/components/QuizLayout";
function Quiz() {
  const router = useRouter();
  const params = router.query;
  const [loading, setLoading] = React.useState(true);
  const quizState = State();
  const { quizInfo, allQuizes } = quizState;
  const actions = Actions();
  const userQuizCollection = [];
  const [open, setOpen] = React.useState(false);
  const handleModal = (
    modalValue,
  ) => {
    setOpen(modalValue);
  };
  const handleNext = (category, totalQuestions, questionCategory) => {
    if (
      quizInfo[category] ||
      quizInfo.activeStep < quizInfo[totalQuestions] - 1
    ) {
      actions.handleNext({ activeStep: quizInfo.activeStep + 1 });
    } else {
      actions.handleNext({ [category]: true, activeStep: 0 });
      actions.setProgress(0);
    }
    actions.setProgress(
      quizState.progress +
        quizState.allQuizes.progressCountNumber[questionCategory]
    );
    setOpen(false);
  };
  const getQuiz = async () => {
    const quiz = await contentfulApiFunctions.getSingleBlogPost(
      params.contentType,
      params.slug
    );
    actions.setQuizes({
      ...quiz,
      progressCountNumber: {
        reading: GlobalFunctions.progressNumber(quiz.quizQuestions.length),
        listening: GlobalFunctions.progressNumber(quiz.audioQuestions.length),
      },
    });
    setLoading(false);
  };

  const getActiveStepQuestion = () => {
    let getQuestionAudioUrl;
    if (quizState?.allQuizes?.audios?.length) {
      getQuestionAudioUrl =
        quizState.allQuizes.audios[quizInfo["activeStep"]]?.fields?.file?.url;
    }
    return "http:" + getQuestionAudioUrl;
  };
  const userQuizHandler = (data) => {
    const quizCollection = [...quizState.quizUserAnswerSelection];
    const getIndex = quizCollection.findIndex((val) => val.id === data.id);
    if (getIndex > -1) {
      quizCollection.splice(getIndex, 1);
    }

    quizCollection.push(data);
    actions.quizAnswerHandler(quizCollection);
  };

  const scoreHandler = (questionCategory, handleNextPayload, isSkip) => {
    
    const collectionType = handleNextPayload[3];
    let questionLeft = GlobalFunctions.getQuestionLeftModule(
      quizState,
      collectionType,
      quizState.quizUserAnswerSelection.length
    );

    if (questionLeft > 0 && !isSkip) {
      return handleModal(
        true,
        handleNextPayload,
        "continue",
        questionCategory,
        questionLeft
      );
    }
    actions.handleUserScore({
      allQuizUserDetail: quizState.quizUserAnswerSelection,
    });
    setOpen(false);
    handleNext(...handleNextPayload);
    actions.quizAnswerHandler([]);
  };
  const getKey = () => {
    const quizExist = quizState?.allQuizes?.quizQuestions?.length;
    if (quizExist) {
      return GlobalFunctions.getObjectKey(
        quizState?.allQuizes?.quizQuestions[quizInfo.activeStep]
      );
    }
  };
  const { ref, inView } = useInView({
    threshold: 0.29,
    // rootMargin:"20px"
  });
  useEffect(() => {
    setLoading(true);
    getQuiz();
  }, []);
  useEffect(() => {
    if (quizState.allQuizes.length) {
      setLoading(false);
    }
  }, [quizState.allQuizes]);

  useEffect(() => {
    if (
      Boolean(quizInfo.isQuizQuestionDone) &&
      Boolean(quizInfo.isQuizListeningDone)
    ) {
      router.push("/quizForm");
    }
  }, [quizInfo.isQuizQuestionDone, quizInfo.isQuizListeningDone]);
  // console.log("all",allQuizes,"op--",quizState?.allQuizes?.quizQuestions[quizInfo.activeStep],quizInfo.activeStep)

  return (
    <div>
      {/* <PageWithTabWarning /> */}

      {(Boolean(quizInfo.isQuizQuestionDone) &&
        Boolean(quizInfo.isQuizListeningDone)) ||
      loading ? (
        <Loader />
      ) : (
        <>
          {!Boolean(quizInfo.isQuizQuestionDone) && (
            <QuizWrapper
              category="reading"
              isQuiz={quizState?.allQuizes.isQuiz}
              fixedProgressBar={getKey() !== "normalText"}
            >
              <NextQuestionCard
                handleModal={handleModal}
                scoreHandlerPayload={[
                  "reading",
                  [
                    "isQuizQuestionDone",
                    "questionsLength",
                    "reading",
                    "quizQuestions",
                  ],
                ]}
                scoreHandler={scoreHandler}
                open={open}
              />
              <div>
                {getKey() === "normalText" ? (
                  <TextMobileStepper
                    quiz={quizState?.allQuizes?.quizQuestions}
                    questionCategory={"reading"}
                    bg={"#eaf2f9"}
                  >
                    <DotBar
                      userQuizCollection={userQuizCollection}
                      dotQuestionInfo={
                        quizState?.allQuizes?.quizQuestions[quizInfo.activeStep]
                          .normalText
                      }
                    />
                    {quizState?.allQuizes?.quizQuestions?.length && (
                      <Box>
                        {quizState?.allQuizes?.quizQuestions[
                          quizInfo.activeStep
                        ].normalText.map((val) => {
                          return (
                            <div
                              key={val.question}
                              style={{ marginTop: "6rem" }}
                              className={styles.ReadingQuestion}
                            >
                              <ReadingQuestion
                                allInfo={val}
                                question={val.question}
                                options={val.options}
                                questionCategory={"reading"}
                                userQuizHandler={userQuizHandler}
                                id={val.question}
                              />
                            </div>
                          );
                        })}
                      </Box>
                    )}
                    <div
                      style={{ width: "80%" }}
                      className={styles.quizBtn_div}
                    >
                      <Button
                        className={styles.quizBtn}
                        onClick={() => {
                          scoreHandler(
                            "reading",
                            [
                              "isQuizQuestionDone",
                              "questionsLength",
                              "reading",
                              "quizQuestions",
                            ],
                            false
                          );
                        }}
                        // disabled={ac=tiveStep === maxSteps - 1}
                      >
                        Next
                      </Button>
                    </div>

                    <div style={{ paddingBottom: "1rem" }}>
                      <p className={styles.footer_text}>
                        © EF Education First. All rights reserved.
                      </p>
                    </div>
                  </TextMobileStepper>
                ) : (
                  <FixedSideStepper
                    quiz={quizState?.allQuizes?.audioQuestions}
                    handleNext={handleNext}
                    questionCategory={"reading"}
                    longPhrase={quizState.allQuizes.phrase1}
                    inView={inView}
                  >
                    <div className={styles.layout}>
                      <Box className={styles.left_side}>
                        <div
                          style={{
                            padding: "1rem",
                            width: "93%",
                            margin: "auto auto",
                          }}
                        >
                          {documentToReactComponents(
                            quizState.allQuizes.phrase1
                          )}
                        </div>
                      </Box>
                      <Box className={styles.right_side} ref={ref}>
                        <DotBar
                          userQuizCollection={userQuizCollection}
                          dotQuestionInfo={
                            quizState?.allQuizes?.quizQuestions[
                              quizState.quizInfo.activeStep
                            ][getKey()]
                          }
                        />
                        {quizState?.allQuizes?.quizQuestions[
                          quizState.quizInfo.activeStep
                        ][getKey()].map((val) => {
                          return (
                            <div
                              key={val.question}
                              className={styles.ReadingQuestion}
                            >
                              {/* <GridQuestion/> */}
                              <ReadingQuestion
                                allInfo={val}
                                question={val.question}
                                options={val.options}
                                questionCategory={"reading"}
                                userQuizHandler={userQuizHandler}
                                id={val.question}
                              />
                            </div>
                          );
                        })}

                        <div className={styles.quizBtn_div}>
                          <Button
                            className={styles.quizBtn}
                            onClick={() => {
                              scoreHandler(
                                "reading",
                                [
                                  "isQuizQuestionDone",
                                  "questionsLength",
                                  "reading",
                                  "quizQuestions",
                                ],
                                false
                              );
                            }}
                            // disabled={ac=tiveStep === maxSteps - 1}
                          >
                            Next
                          </Button>
                        </div>

                        <div style={{ paddingBottom: "1rem" }}>
                          <p className={styles.footer_text}>
                            © EF Education First. All rights reserved.
                          </p>
                        </div>
                      </Box>
                    </div>
                  </FixedSideStepper>
                )}
              </div>
            </QuizWrapper>
          )}

          {Boolean(quizInfo.isQuizQuestionDone) &&
            !Boolean(quizInfo.isQuizListeningDone) && (
              <QuizWrapper
                category="listening"
                isQuiz={quizState?.allQuizes.isQuiz}
                fixedProgressBar={getKey() !== "normalText"}
              >
                <NextQuestionCard
                  handleModal={handleModal}
                  scoreHandlerPayload={[
                    "listening",
                    [
                      "isQuizListeningDone",
                      "listeningQuestionLength",
                      "listening",
                      "audioQuestions",
                    ],
                  ]}
                  scoreHandler={scoreHandler}
                  open={open}
                />
                <FixedSideStepper
                  quiz={quizState?.allQuizes?.audioQuestions}
                  handleNext={handleNext}
                  questionCategory={"listening"}
                >
                  <div className={styles.layout}>
                    <Box className={styles.left_side}>
                      <AudioTrackComponent
                        questionUrl={getActiveStepQuestion}
                      />
                    </Box>
                    <Box sx={{ p: 2 , backgroundColor: '#eaf2f9'}} className={styles.right_side}>
                      <DotBar
                        userQuizCollection={userQuizCollection}
                        dotQuestionInfo={
                          quizState?.allQuizes?.audioQuestions[
                            quizState.quizInfo.activeStep
                          ]
                        }
                      />
                      {quizState?.allQuizes?.audioQuestions[
                        quizState.quizInfo.activeStep
                      ].map((val) => {
                        return (
                          <div
                            className={styles.ReadingQuestion}
                            key={val.question}
                            style={{ marginTop: "1rem" }}
                          >
                            <ReadingQuestion
                              allInfo={val}
                              question={val.question}
                              options={val.options}
                              questionCategory={"listening"}
                              userQuizHandler={userQuizHandler}
                              id={val.question}
                            />
                          </div>
                        );
                      })}
                      <div className={styles.quizBtn_div}>
                        <Button
                          className={styles.quizBtn}
                          onClick={() => {
                            scoreHandler(
                              "listening",
                              [
                                "isQuizListeningDone",
                                "listeningQuestionLength",
                                "listening",
                                "audioQuestions",
                              ],
                              false
                            );
                          }}
                          // disabled={ac=tiveStep === maxSteps - 1}
                        >
                          Next
                        </Button>
                      </div>

                      <div style={{ paddingBottom: "1rem" }}>
                        <p className={styles.footer_text}>
                          © EF Education First. All rights reserved.
                        </p>
                      </div>
                    </Box>
                  </div>
                </FixedSideStepper>
              </QuizWrapper>
            )}
        </>
      )}
    </div>
  );
}
Quiz.getLayout = function getLayout(page) {
  return (
    <QuizLayout>
      {page}
    </QuizLayout>
  )
}
export default Quiz;
