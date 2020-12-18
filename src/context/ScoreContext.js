import React, { useState, createContext } from "react";

export const ScoreContext = createContext();

const ScoreContextProvider = props => {
  const [userScore, setUserScore] = useState(0);

  const increaseScore = () => {
    setUserScore(userScore + 10);
  };
  return (
    <ScoreContext.Provider value={{ userScore, increaseScore, setUserScore }}>
      {props.children}
    </ScoreContext.Provider>
  );
};

export default ScoreContextProvider;
