import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import ResultsCard from "./ResultsCard";
import "./Components.css";
import { Button } from "react-bootstrap";

const ResultsBox = () => {
  const categoriesList = useSelector(
    (state) => state.assessment.present.selectedCategories
  );

  const resultsCSS = useSelector(
    (state) => state.assessment.present.resultsCSS
  );

  return (
    <div style={resultsCSS}>
      <Button> Click here to export your results.</Button>
      <div className="resultsBox">
        {categoriesList.map((item) => {
          return <ResultsCard cardTitle={item} key={Math.random()} />;
        })}
      </div>
    </div>
  );
};

export default ResultsBox;
