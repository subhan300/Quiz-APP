import { Actions, State } from '@/context/context'
import React from 'react'

function useAnswerCheck() {
  const actions=Actions();
  const quizState=State();
  const handleAnswerCheck=(givenAnswer,questionInfo,questionCategory)=>{
    // if(questionInfo.answer!==givenAnswer){
        // actions.handleUserScore({[questionCategory]:quizState.userScore[questionCategory] + 5})
      return true
    // }
  }
  return (
    {handleAnswerCheck}
  )
}

export default useAnswerCheck
