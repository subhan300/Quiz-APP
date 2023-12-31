import {
  PROGRESS_COUNT,
  QUIZ_CLOSE,
  QUIZ_RESET,
  SET_CURRENT_STEP,
  SET_PAGE_LOAD,
  SET_QUIZES,
  SET_RESULT,
  SET_USER_FORM_SUBMIT,
  SET_USER_QUIZ_HANDLER,
  SET_USER_SCORE,
  THEME_MODE,
} from "./constants";
import actionsFunctions from "./actions";
import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
const initialState = {
  themeMode: "",
  pageLoad: false,
  allQuizes: [],
  userFormSubmit: false,
  quizUserAnswerSelection: [],
  quizInfo: {
    isQuizQuestionDone: false,
    questionsLength: 0,
    listeningQuestionLength: 0,
    isQuizListeningDone: false,
    activeStep: 0,
    ALLQuestionsTotalNumber: {
      listeningQuestionLength: 0,
      readingQuestionsLength: 0,
    },
  },
  userScore: {
    listening: 0,
    reading: 0,
    allQuizUserDetail: [],
    questionLeft: {
      listening: 0,
      reading: 0,
    },
  },
  progress: 0,
  // userScore: {
  //   listening: 40,
  //   reading: 70,
  //   allQuizUserDetail: [
  //     {
  //       answer: 'Java',
  //       givenAnswer: 'Java',
  //       score: 10,
  //       questionCategory: 'reading',
  //       id: 'Which of the following programming languages do you know?'
  //     },
  //     {
  //       answer: 'I developed a web application for a client.',
  //       givenAnswer: 'I developed a web application for a client.',
  //       score: 10,
  //       questionCategory: 'reading',
  //       id: 'What programming projects have you worked on recently?'
  //     },
  //     {
  //       answer: 'Python',
  //       givenAnswer: 'Python',
  //       score: 10,
  //       questionCategory: 'reading',
  //       id: 'What is your preferred programming language?'
  //     },
  //     {
  //       answer: 'I faced a complex concurrency issue while working on a multi-threaded application.',
  //       givenAnswer: 'I faced a complex concurrency issue while working on a multi-threaded application.',
  //       score: 10,
  //       questionCategory: 'reading',
  //       id: 'Can you describe your most challenging programming problem?'
  //     },
  //     {
  //       answer: 'I optimized a database query that improved response times by 30%.',
  //       givenAnswer: 'I optimized a database query that improved response times by 30%.',
  //       score: 10,
  //       questionCategory: 'reading',
  //       id: 'Tell me about a project where you had to optimize performance.'
  //     },
  //     {
  //       answer: 'Java',
  //       givenAnswer: 'Java',
  //       score: 10,
  //       questionCategory: 'reading',
  //       id: 'Which of the following programming languages do you know tell?'
  //     },
  //     {
  //       answer: 'Python',
  //       givenAnswer: 'C++',
  //       score: 0,
  //       questionCategory: 'reading',
  //       id: 'What is your favourite programming language?'
  //     },
  //     {
  //       answer: 'I developed a web application for a client.',
  //       givenAnswer: 'I developed a web application for a client.',
  //       score: 10,
  //       questionCategory: 'reading',
  //       id: 'What programming projects have you worked on recently last time?'
  //     },
  //     {
  //       answer: 'Java',
  //       givenAnswer: 'Java',
  //       score: 10,
  //       questionCategory: 'listening',
  //       id: 'Which of the following programming languages do you know professonaly?'
  //     },
  //     {
  //       answer: 'Python',
  //       givenAnswer: 'C++',
  //       score: 0,
  //       questionCategory: 'listening',
  //       id: 'What is your interested?'
  //     },
  //     {
  //       answer: 'I developed a web application for a client.',
  //       givenAnswer: 'I developed a web application for a client.',
  //       score: 10,
  //       questionCategory: 'listening',
  //       id: 'What programming projects have seen?'
  //     },
  //     {
  //       answer: 'I optimized a database query that improved response times by 30%.',
  //       givenAnswer: 'I optimized a database query that improved response times by 30%.',
  //       score: 10,
  //       questionCategory: 'listening',
  //       id: 'Tell me about a project where you had to optimize performance. ?'
  //     },
  //     {
  //       answer: 'I faced a complex concurrency issue while working on a multi-threaded application.',
  //       givenAnswer: 'I faced a complex concurrency issue while working on a multi-threaded application.',
  //       score: 10,
  //       questionCategory: 'listening',
  //       id: 'Can you describe your most challenging programming problem in your life?'
  //     }
  //   ],
  //   questionLeft: { listening: 1, reading: 3 }
  // }
};

const ActionsContext = React.createContext(null, null);
const StateContext = React.createContext(null, null);
const DispatchContext = React.createContext(null, null);

export function reducer(state, action) {
  switch (action.type) {
    case THEME_MODE:
      return {
        ...state,
      };
    case PROGRESS_COUNT:
      return { ...state, progress: action.payload };
    case SET_QUIZES:
      return {
        ...state,
        allQuizes: action.payload,
      };
    case SET_CURRENT_STEP:
      return { ...state, quizInfo: { ...state.quizInfo, ...action.payload } };
    case SET_USER_SCORE:
      return {
        ...state,
        userScore: {
          ...state.userScore,
          questionLeft: {
            ...state.userScore.questionLeft,
            ...action.payload.questionLeft,
          },
          allQuizUserDetail: [
            ...state.userScore.allQuizUserDetail,
            ...action.payload.allQuizUserDetail,
          ],
        },
      };
    case SET_RESULT:
      return {
        ...state,
        userScore: {
          ...state.userScore,
          ...action.payload,
        },
      };
    case SET_PAGE_LOAD:
      return { ...state, pageLoad: action.payload };
    case SET_USER_FORM_SUBMIT:
      return { ...state, userFormSubmit: action.payload };
    case QUIZ_CLOSE:
      return { ...state, quizInfo: { ...state.quizInfo, ...action.payload } };
    case QUIZ_RESET:
      return initialState;
    case SET_USER_QUIZ_HANDLER:
      return { ...state, quizUserAnswerSelection: action.payload };

    default:
      return state;
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [mode, setMode] = React.useState("light");
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const [actions] = React.useState({
    handleNext: actionsFunctions.handleNext(dispatch),
    setQuizes: actionsFunctions.setQuizes(dispatch),
    toggleColorMode: toggleColorMode,
    handleUserScore: actionsFunctions.handleUserScore(dispatch),
    setResult: actionsFunctions.setResult(dispatch),
    setPageLoad: actionsFunctions.setPageLoad(dispatch),
    setProgress: actionsFunctions.setProgress(dispatch),
    setUserFormSubmit: actionsFunctions.setUserFormSubmit(dispatch),
    QuizCloseOnTimeout: actionsFunctions.QuizCloseOnTimeout(dispatch),
    quizReset: actionsFunctions.quizReset(dispatch),
    quizAnswerHandler: actionsFunctions.quizAnswerHandler(dispatch),
  });

  const theme = () => {
    return createTheme({
      palette: {
        mode,
      },
      // primaryColor: "red",
      // customShadows: { z24: "red" },
    });
  };
  return (
    <>
      <ActionsContext.Provider value={actions}>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            {/* {children} */}
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </ActionsContext.Provider>
    </>
  );
};

function Actions() {
  const context = React.useContext(ActionsContext);
  if (context === undefined) {
    throw new Error("useAuthActions must be used within a AuthProvider");
  }
  return context;
}

function State() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function Dispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

export { ContextProvider, Actions, State, Dispatch };
