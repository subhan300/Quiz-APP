import React from "react";
import styles from "../styles/DotBar.module.css";
import {State} from "@/context/context"
function DotBar({ dotQuestionInfo, }) {
    console.log("dot",dotQuestionInfo)
    const {quizUserAnswerSelection} = State();
    console.log("quiz inof",quizUserAnswerSelection )
    function filterUserAnswersWithInfo(question) {
         return quizUserAnswerSelection.some((selection) => {
            console.log("userAnswer",selection,question)
            return selection.id === question;
          });
              
        
      }
     
  return (
    <div className={styles.dot_bar}>
      {dotQuestionInfo.map((val) => (
        <div
          className={`${styles.dot} ${
            filterUserAnswersWithInfo(val.question) ? styles.dot_active : ""
          }`}
        ></div>
      ))}
    </div>
  );
}

export default DotBar;
