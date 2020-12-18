import React from "react";
import AnswerButton from "./AnswerButton";
import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  card: {
    maxWidth: "90%",
    margin: "auto"
  },
  paper: { padding: "6% 2%", margin: "0% 5% 10% 5%", borderRadius: "20px" }
});

const QuizCard = props => {
  const classes = useStyles();
  const { questText, correctAns, allOptions, userAns } = props.question;

  return (
    <div>
      <div className={classes.card}>
        <Paper elevation={10} className={classes.paper}>
          <div style={{ fontSize: "80%" }}>{questText}</div>
        </Paper>
        <Grid container>
          {allOptions.map(opt => {
            return (
              <Grid item xs={12} sm={6}>
                <AnswerButton
                  option={opt}
                  correctAns={correctAns}
                  userAns={userAns}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default QuizCard;

// <Grid item xs={6}>
// <AnswerButton option="A" correctAns={correctAns} />
// </Grid>
