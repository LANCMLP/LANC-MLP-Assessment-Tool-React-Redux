import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { Navbar, Container, ProgressBar, ListGroupItem } from "react-bootstrap";

const MyProgressBar = () => {
  const selectedIssues = useSelector(
    (state) => state.assessment.present.selectedIssues
  );

  const selectedCategories = useSelector(
    (state) => state.assessment.present.selectedCategories
  );

  const currentCategory = useSelector(
    (state) => state.assessment.present.currentCategoryName
  );

  const selectedCategoriesFixed = String(selectedCategories).replaceAll(
    ",",
    ", "
  );
  const selectedIssuesFixed = String(selectedIssues).replaceAll(",", ", ");

  const currentCategoryIndex = useSelector(
    (state) => state.assessment.present.currentCategoryIndex
  );
  const totalCategories = useSelector(
    (state) => state.assessment.present.totalCategories
  );

  var now = (currentCategoryIndex / totalCategories) * 100;

  const getPerc = (value) => {
    if (isNaN(value) === true) return 0;
    else return value;
  };

  return (
    <React.Fragment>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text style={{ color: "black" }}>
              <ListGroupItem key={Math.random()}>
                <b>Selected Categories:</b> {selectedIssuesFixed}
              </ListGroupItem>
              <ListGroupItem>
                <b> Selected Issues:</b> {selectedCategoriesFixed}
              </ListGroupItem>
              <ListGroupItem>
                <b>Current Issue Being Assessed:</b> {currentCategory}
              </ListGroupItem>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ProgressBar now={getPerc(now)} label={`${Math.round(getPerc(now))}%`} />
    </React.Fragment>
  );
};

export default MyProgressBar;
