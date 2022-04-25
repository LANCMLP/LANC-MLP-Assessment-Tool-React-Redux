import React from "react";
import { Modal, Button } from "react-bootstrap";
import { CLOSE_POPUP, UPDATE_FIXED_RESULT } from "./assessmentSlice";
import { useDispatch, useSelector } from "react-redux";

export default function IntermediateResult() {
  const dispatch = useDispatch();
  const popupCSS = useSelector((state) => state.assessment.present.popupCSS);
  const result = useSelector((state) => state.assessment.present.result);
  const getCategoryIndex = useSelector(
    (state) => state.assessment.present.currentCategoryIndex
  );
  const getCleanResult = useSelector(
    (state) => state.assessment.present.fixedResult
  );
  const allCategories = useSelector(
    (state) => state.assessment.present.selectedCategories
  );

  const getPrevCategory = allCategories.filter(
    (item) => allCategories.indexOf(String(item)) === getCategoryIndex - 1
  );

  const getResult = result.filter(
    (item) => result.indexOf(String(item)) === getCategoryIndex - 1
  );

  const cleanedResult = String(getResult)
    .replace(/\\/g, "")
    .replaceAll("] ]", "")
    .replaceAll("[", "")
    .replaceAll('"', "");

  const updateResult = dispatch(UPDATE_FIXED_RESULT(cleanedResult));
  console.log(updateResult);

  return (
    <>
      <Modal show={popupCSS} centered={true} backdrop="static">
        <Modal.Header>
          <Modal.Title>Result for: {getPrevCategory}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{getCleanResult}</Modal.Body>
        <Button
          variant="secondary"
          onClick={() => dispatch(CLOSE_POPUP())}
          style={{
            margin: "auto",
            textAlign: "center",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Next Issue
        </Button>
      </Modal>
    </>
  );
}
