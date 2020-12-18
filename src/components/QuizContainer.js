import React, { useContext } from "react";
import QuizCard from "./QuizCard";
import SubmitModal from "./SubmitModal";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import { QuestionContext } from "../context/QuestionContext";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

const QuizContainer = props => {
  const { questions, questIndex, setQuestIndex, isLastQuestion } = useContext(
    QuestionContext
  );
  //React.useEffect(() => console.log(props.location));
  return (
    <div>
      <Container>
        {props.location.state && (
          <Alert icon={false} severity="error">
            {props.location.state.alertMsg}
          </Alert>
        )}
        <div style={{ textAlign: "right", marginRight: "12%" }}>
          <IconButton
            onClick={() => {
              if (questIndex > 0) setQuestIndex(questIndex - 1);
            }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <span style={{ fontSize: "15px" }}>
            {questIndex + 1} / {questions.length}
          </span>
          <IconButton
            onClick={() => {
              if (!isLastQuestion) setQuestIndex(questIndex + 1);
            }}
          >
            <ArrowRightIcon />
          </IconButton>
        </div>

        <QuizCard
          question={questions[questIndex]}
          style={{ marginTop: "0px" }}
        />
        <SubmitModal />
      </Container>
    </div>
  );
};

export default QuizContainer;
