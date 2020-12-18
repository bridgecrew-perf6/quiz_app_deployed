import React, { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";
import { ScoreContext } from "../context/ScoreContext";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
//import { flexbox } from "@material-ui/system";

const useStyles = makeStyles({
  button: {
    marginTop: "5%",
    backgroundColor: " #5794ff",
    color: "#ffffff",
    width: "100%",
    border: "1px solid   #5794ff",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: " #ffffff ",
      color: "black",
      border: "1px solid   #ffffff"
    }
  },
  bodyText: {
    fontSize: "18px"
  },
  headingText: {
    fontSize: "20px"
  }
});
const ResultScreen = props => {
  const classes = useStyles();

  const { questions, setSubmitQuiz, setQuestIndex, setQuestions } = useContext(
    QuestionContext
  );
  const { setUserScore } = useContext(ScoreContext);
  const resetQuiz = () => {
    setQuestions(
      questions.map(quest => {
        return { ...quest, answered: false, userAns: undefined };
      })
    );
    setSubmitQuiz(false);
    localStorage.removeItem("submitQuiz"); //setting the key to false was not working for some reason
    setQuestIndex(0);
    setUserScore(0);
    props.history.push("/");
  };
  // React.useEffect(() =>
  //   console.log(JSON.parse(localStorage.getItem("submitQuiz")))
  // );

  return (
    <Container style={{ marginTop: "10%" }}>
      {props.location.state && (
        <Alert icon={false} severity="error">
          {props.location.state.alertMsg}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.headingText}>
                Q.No
              </TableCell>
              <TableCell align="center" className={classes.headingText}>
                Correct?
              </TableCell>
              <TableCell align="center" className={classes.headingText}>
                Correct Answer
              </TableCell>
              <TableCell align="center" className={classes.headingText}>
                You Answered
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={index}>
                <TableCell align="center" className={classes.bodyText}>
                  {index + 1}
                </TableCell>
                <TableCell align="center" className={classes.bodyText}>
                  {question.userAns === question.correctAns ? (
                    <CheckIcon style={{ color: "green" }} />
                  ) : (
                    <CloseIcon style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell align="center" className={classes.bodyText}>
                  {question.correctAns}
                </TableCell>
                <TableCell align="center" className={classes.bodyText}>
                  {question.userAns || "Unattempted"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => {
          resetQuiz();
        }}
      >
        Reset
      </Button>
    </Container>
  );
};

export default ResultScreen;
