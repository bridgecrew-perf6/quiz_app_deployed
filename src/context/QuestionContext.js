import React, { useState, createContext } from "react";

export const QuestionContext = createContext();

const QuestionContextProvider = props => {
  const [questIndex, setQuestIndex] = useState(0);
  // eslint-disable-next-line
  const [submitQuiz, setSubmitQuiz] = useState(false);

  const [questions, setQuestions] = useState([
    {
      questText: "Who discovered gravity?",
      correctAns: "Isaac Newton",
      userAns: undefined,
      answered: false,
      allOptions: [
        "Nickola Tesla",
        "Albert Einstein",
        "Isaac Newton",
        "Michael Jackson"
      ]
    },
    {
      questText: "Which metal is liquid at room temperature?",
      correctAns: "Mercury",
      userAns: undefined,
      answered: false,
      allOptions: ["Mercury", "Iron", "Copper", "Gold"]
    },
    {
      questText: "Which one of these is not a starter Pokemon?",
      correctAns: "Agumon",
      userAns: undefined,
      answered: false,
      allOptions: ["Bulbasaur", "Agumon", "Charizard", "Squirtle"]
    },
    {
      questText: "Which of these is the largest continent of the world?",
      correctAns: "Asia",
      userAns: undefined,
      answered: false,
      allOptions: ["Africa", "Asia", "Australia", "Europe"]
    },
    {
      questText: "Oil, Natural gas, and coal are examples of...",
      correctAns: "Fossil Fuels",
      userAns: undefined,
      answered: false,
      allOptions: [
        "Renewable resources",
        "Biofuels",
        "Geothermal resources",
        "Fossil Fuels"
      ]
    }
  ]);
  let isLastQuestion = questIndex < questions.length - 1 ? false : true;
  let ansAllQuest = questions.every(quest => quest.answered === true);

  const markAnswered = (ind, userAns) => {
    setQuestions(
      questions.map((quest, i) => {
        return i === ind
          ? { ...quest, answered: true, userAns: userAns }
          : quest;
      })
    );
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        questIndex,
        setQuestIndex,
        isLastQuestion,
        ansAllQuest,
        markAnswered,
        submitQuiz,
        setSubmitQuiz,
        setQuestions
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
