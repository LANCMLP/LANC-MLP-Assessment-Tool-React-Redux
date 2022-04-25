import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

const ResultsCard = (props) => {
  const resultsList = useSelector((state) => state.assessment.present.result);
  const categoriesList = useSelector(
    (state) => state.assessment.selectedCategories
  );

  var filteredResults = null;
  var cleanResults1 = null;
  var cleanResults2 = null;
  var cleanResults3 = null;
  var cleanResults4 = null;

  const clean = () => {
    if (resultsList.lenth > 0) {
      filteredResults =
        resultsList[categoriesList.indexOf(String(props.cardTitle))];
      cleanResults1 = filteredResults.replace(/\\/g, "");
      cleanResults2 = cleanResults1.replaceAll("] ]", "");
      cleanResults3 = cleanResults2.replaceAll("[", "");
      cleanResults4 = cleanResults3.replaceAll('"', "");
    } else {
      filteredResults = resultsList;
      cleanResults1 = String(filteredResults).replace(/\\/g, "");
      cleanResults2 = cleanResults1.replaceAll("] ]", "");
      cleanResults3 = cleanResults2.replaceAll("[", "");
      cleanResults4 = cleanResults3.replaceAll('"', "");
    }
    return cleanResults4.split(", ");
  };

  function generateList() {
    if (resultsList.length > 0)
      return (
        <ListGroup className="list-group-flush">
          {clean().map((item) => {
            return <ListGroupItem key={Math.random()}>{item}</ListGroupItem>;
          })}
        </ListGroup>
      );
  }

  return (
    <Card
      style={{
        width: "18rem",
        margin: "15px",
      }}
    >
      <Card.Img
        variant="top"
        src="https://thumbs.dreamstime.com/z/online-test-checklist-pencil-computer-monitor-form-survey-line-questionnaire-choosing-answer-web-learning-vector-142485089.jpg"
      />
      <Card.Body>
        <Card.Title>{props.cardTitle}</Card.Title>
      </Card.Body>
      {generateList()}
    </Card>
  );
};

export default ResultsCard;
