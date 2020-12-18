import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizContainer from "./components/QuizContainer";
import ScoreContextProvider from "./context/ScoreContext";
import ResultScreen from "./components/ResultScreen";
import AppBar from "@material-ui/core/AppBar";
import { QuestionContext } from "./context/QuestionContext";

function App() {
  // #region Explanation Comment
  // We can access QuestionContext here because we wrapped the App component tag in index.js file with the QuestionContextProvider. Otherwise, if we only wrapped the components which the ScoreContextProvider is wrapping, we could not access the QuestionContext here, and we getting an error that stated: "useContext is undefined"
  // I needed to use LocalStorage here because pressing the back button twice in the result screen overwrote the state and the submitQuiz variable so the user was taken back even though they shouldnot be allowed to.
  //I'm resetting submitQuizVar inside useEffect because the app component wasn't rerendering when setSubmitQuiz was running and becasue of that the updated localStorage item wasn't being recieved here
  // #endregion
  const { submitQuiz } = useContext(QuestionContext);
  let submitQuizVar = JSON.parse(localStorage.getItem("submitQuiz"));
  React.useEffect(() => {
    // eslint-disable-next-line
    submitQuizVar = JSON.parse(localStorage.getItem("submitQuiz"));
  }, [submitQuiz]);

  return (
    <div className="App">
      {/* <h2 style={{ fontFamily: "Merriweather, serif" }}>React Quiz App</h2> */}
      <AppBar
        position="static"
        style={{ height: "100px", backgroundColor: "#5794ff" }}
      >
        <h4 style={{ fontFamily: "Merriweather, serif" }}>React Quiz App</h4>
      </AppBar>
      <ScoreContextProvider>
        <Router>
          <ProtectedRoute
            exact
            path="/"
            redirectPath="/results"
            alertMsg="Please press the reset button to retake the quiz."
            component={QuizContainer}
            routeCondition={!submitQuizVar}
          />
          <ProtectedRoute
            exact
            path="/results"
            redirectPath="/"
            alertMsg="Please submit the exam to view the result."
            component={ResultScreen}
            routeCondition={submitQuizVar}
          />
        </Router>
      </ScoreContextProvider>
    </div>
  );
}

export default App;

//redirectTo={ResultScreen} routeCondition={!submitQuiz}
