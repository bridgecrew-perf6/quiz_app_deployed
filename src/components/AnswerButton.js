import React, { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";
import { ScoreContext } from "../context/ScoreContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    width: "80%",
    marginTop: "5%",
    borderRadius: "15px",
    height: "70%",
    border: "3px solid #5794ff",
    color: "#5794ff",
    fontSize: "16px"
  },
  buttonFilled: {
    width: "80%",
    marginTop: "7%",
    borderRadius: "15px",
    height: "70%",
    backgroundColor: "#5794ff",
    color: "#ffffff",
    fontSize: "16px"
  }
});

const AnswerButton = props => {
  const classes = useStyles();
  const {
    questIndex,
    setQuestIndex,
    isLastQuestion,
    markAnswered
  } = useContext(QuestionContext);
  const { increaseScore } = useContext(ScoreContext);

  const { option, correctAns, userAns } = props;
  const checkAnswer = ans => {
    if (ans === correctAns) {
      increaseScore();
    }
  };

  return (
    <Button
      //variant={userAns === option ? "outlined" : "contained"}
      className={userAns === option ? classes.button : classes.buttonFilled}
      onClick={() => {
        markAnswered(questIndex, option);

        if (!isLastQuestion) {
          setQuestIndex(questIndex + 1);
        }
        checkAnswer(option);
      }}
    >
      {option}
    </Button>
  );
};

export default AnswerButton;
