import React, { useEffect, useState } from "react";
import style from "../../styles/QuizWrapper.module.css";
import QuizInfo from "../quizInfo";
import { Actions, State } from "@/context/context";
import ProgressTimeShow from "../ProgressTimeShow";
function QuizWrapper({ children, headerLines, isQuiz,category ,fixedProgressBar}) {
  const quizState = State();
  const actions=Actions()
  const { quizInfo } = quizState;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Add smooth scrolling for a better user experience
    });
  };

  const [quizStart, setStartQuiz] = useState(false);
  const startQuiz = () => {
    
    actions.setProgress(0);
    scrollToTop()
    setStartQuiz(true);
    // if(window.scrollY){
    //   setStartQuiz(true);
    // }
  };
 
  console.log("ll",window.scrollY)
  return (
    <div
      className={style.quiz_wrapper}
      style={{
        backgroundColor: Boolean(quizStart) ? "#eaf2f9" : "#79B3F8",
        width: "100%",
      }}
    >
      {!Boolean(quizStart) && <QuizInfo category={category} isQuiz={isQuiz} startQuiz={startQuiz} />}
      {Boolean(quizStart) && (
        <>
          <ProgressTimeShow time={isQuiz ? 25 : 7} fixedProgressBar={fixedProgressBar} category={category} />
          {quizInfo.activeStep === 0 && headerLines && (
            <>
              <h3 className={style.quiz_headline}>
                You will read 10 sentences
              </h3>
              <h3 className={style.quiz_headline}>
                Choose the word or phrase that complete each sentence
              </h3>
            </>
          )}
          {children}
        </>
      )}

      {/* <p className={style.quiz_tagLine}>© EF Education First. All rights reserved.</p> */}
    </div>
  );
}

export default QuizWrapper;
