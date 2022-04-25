import "./App.css";
import { Assessment } from "./features/assessment";
import MyProgressBar from "./features/Progressbar";
import Header from "./features/Header";
import ResultsBox from "./features/ResultsBox";
import { useSelector } from "react-redux";
import UndoRedo from "./features/UndoRedo";
import React from "react";
import ConsultBox from "./features/ConsultDirectory";

function App() {
  const displayResults = useSelector((state) => state.assessment.resultsCSS);

  return (
    <div className="App">
      <Header />
      <MyProgressBar />
      <br></br>
      <Assessment />
      <br></br>
      <UndoRedo />
      <br></br>
      <ResultsBox style={displayResults} />
      <ConsultBox />
    </div>
  );
}

export default App;
