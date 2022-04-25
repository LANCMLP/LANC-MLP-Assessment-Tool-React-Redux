import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Components.css";
import { Table, Form, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ConsultBox = () => {
  const resultsList = useSelector((state) => state.assessment.present.result);

  const consultCSS = useSelector(
    (state) => state.assessment.present.consultCSS
  );

  //   const categoriesList = useSelector(
  //     (state) => state.assessment.selectedCategories
  //   );

  //   var filteredResults = null;
  //   var cleanResults1 = null;
  //   var cleanResults2 = null;
  //   var cleanResults3 = null;
  //   var cleanResults4 = null;

  //   const clean = () => {
  //     if (resultsList.lenth > 0) {
  //       filteredResults =
  //         resultsList[categoriesList.indexOf(String(props.cardTitle))];
  //       cleanResults1 = filteredResults.replace(/\\/g, "");
  //       cleanResults2 = cleanResults1.replaceAll("] ]", "");
  //       cleanResults3 = cleanResults2.replaceAll("[", "");
  //       cleanResults4 = cleanResults3.replaceAll('"', "");
  //     } else {
  //       filteredResults = resultsList;
  //       cleanResults1 = String(filteredResults).replace(/\\/g, "");
  //       cleanResults2 = cleanResults1.replaceAll("] ]", "");
  //       cleanResults3 = cleanResults2.replaceAll("[", "");
  //       cleanResults4 = cleanResults3.replaceAll('"', "");
  //     }
  //     return cleanResults4.split(", ");
  //   };

  return (
    <div style={consultCSS}>
      <div
        style={{
          marginBottom: "30px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <h1>Consultations</h1>
        <p>Your assessment concluded that you should make a consultation.</p>
        <h2>What is a consultation?</h2>
        <p>
          A consultation is a brief check-in with one of our advocates to talk
          about your patient's issue and advise you on whether LANC can assist.
          It is very important that consults are de-identified, meaning that you
          do not provide any identifying information about the patient. This is
          to ensure compliance with HIPPA. If you have questions about this, our
          advocates can explain in more detail.
        </p>
        <p>
          Request a consult by filling out the form below, or by reaching out to
          the appropriate LANC advocate in the directory below. Each of our
          advocates has medical parters for which they are the primary point of
          contact. Please reach out to the correct advocate listed below.{" "}
        </p>
        <Container>
          <Form>
            <Form.Group controlId="form.Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name here." />
            </Form.Group>
            <Form.Group controlId="form.Name">
              <Form.Label>Your Medical Institution or HSO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your medical institution or HSO's name"
              />
            </Form.Group>
            <Form.Group controlId="form.Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="form.Check" style={{ margin: "15px" }}>
              <Form.Check
                id="default"
                inline
                label="Check if this patient is a HOP participant."
              />
            </Form.Group>
            <Form.Group controlId="form.Name">
              <Form.Label>What issue(s) is this consult about?</Form.Label>
              <Form.Control
                type="text"
                placeholder="List relevant issues here."
              />
            </Form.Group>
            <Form.Group controlId="form.Textarea">
              <Form.Label>Other Information or Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Please remember not to include any identifying information about your patient."
              />
            </Form.Group>
            <Form.Group>
              <Button style={{ margin: "20px" }} type="Submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Institution</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NC Children's Hospital</td>
              <td>Anthony</td>
              <td>A</td>
              <td>A@legalaidnc.org</td>
              <td>999-999-9999</td>
            </tr>
            <tr>
              <td>Downtown Health Plaza</td>
              <td>Eunice</td>
              <td>L</td>
              <td>L@legalaidnc.org</td>
              <td>999-999-9999</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ConsultBox;
