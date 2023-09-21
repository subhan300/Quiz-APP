import GlobalFunctions from "../../lib/GlobalFunctions";

const {
  SET_QUIZES,
  SET_CURRENT_STEP,
  SET_USER_SCORE,
  SET_RESULT,
  SET_PAGE_LOAD,
  PROGRESS_COUNT,
  SET_USER_FORM_SUBMIT,
  QUIZ_CLOSE,
  QUIZ_RESET,
  SET_MENU,
  SET_USER_QUIZ_HANDLER,
} = require("./constants");

const getALLQuestionsLength = (data) => {
  const readingQuestionsLength = data.quizQuestions.reduce(
    (acc, subArray) =>{
      return acc + GlobalFunctions.getObjectKey(subArray).length}
    ,
    0
  );
  const listeningQuestionLength = data.audioQuestions.reduce(
    (acc, subArray) => acc + subArray.length,
    0
  );
  return { readingQuestionsLength, listeningQuestionLength };
};
const setQuizes = (dispatch) => (data) => {
  dispatch({ type: SET_QUIZES, payload: data });
  const ALLQuestionsTotalNumber = getALLQuestionsLength(data);
  let quizInfo = {
    isQuizQuestionDone: false,
    questionsLength: data.quizQuestions?.length,
    listeningQuestionLength: data.audioQuestions?.length,
    isQuizListeningDone: false,
    activeStep: 0,
    ALLQuestionsTotalNumber,
    
  };
  dispatch({ type: SET_CURRENT_STEP, payload: quizInfo });
};
const QuizCloseOnTimeout = (dispatch) => (data) => {
  dispatch({ type: QUIZ_CLOSE, payload: data });
};
const quizAnswerHandler = (dispatch) => (data) => {
  dispatch({ type: SET_USER_QUIZ_HANDLER, payload: data });
};
const handleNext = (dispatch) => (data) => {
  dispatch({ type: SET_CURRENT_STEP, payload: data });
};

const handleUserScore = (dispatch) => (data) => {
  dispatch({ type: SET_USER_SCORE, payload: data });
};
const setResult = (dispatch) => (data) => {
  dispatch({ type: SET_RESULT, payload: data });
};
const setPageLoad = (dispatch) => (data) => {
  dispatch({ type: SET_PAGE_LOAD, payload: data });
};

const setProgress = (dispatch) => (data) => {
  dispatch({ type: PROGRESS_COUNT, payload: data });
};
const setUserFormSubmit = (dispatch) => (data) => {
  dispatch({ type: SET_USER_FORM_SUBMIT, payload: data });
};
const quizReset = (dispatch) => () => {
  dispatch({ type: QUIZ_RESET});
};
const setMenu = (dispatch) => (data) => {
dispatch({ type: SET_MENU,payload:data});
};

export default {
  setQuizes,
  handleNext,
  handleUserScore,
  setResult,
  setPageLoad,
  setProgress,
  setUserFormSubmit,
  QuizCloseOnTimeout,
  quizReset,
  setMenu,
  quizAnswerHandler
};
