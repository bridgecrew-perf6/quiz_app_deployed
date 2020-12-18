import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { QuestionContext } from "../context/QuestionContext";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  submitBbutton: {
    width: "82%",
    marginTop: "10%",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    border: "1px solid  #1E88E5 ",
    "&:hover": {
      backgroundColor: " #5794ff ",
      color: "white"
    }
  }
}));
const SubmitModal = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const { ansAllQuest, setSubmitQuiz } = useContext(QuestionContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="button"
        size="large"
        onClick={handleOpen}
        className={classes.submitBbutton}
        variant="contained"
      >
        Submit
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {ansAllQuest ? (
              <p id="transition-modal-description">
                Submit your quiz? You can't change your answers after
                submission.
              </p>
            ) : (
              <p id="transition-modal-description">
                You haven't attempted all questions. Are you sure you want to
                submit?
              </p>
            )}
            <Button
              onClick={() => {
                setSubmitQuiz(true);
                localStorage.setItem("submitQuiz", true);

                props.history.push("/results");
              }}
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "2%" }}
            >
              Cancel
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withRouter(SubmitModal);
