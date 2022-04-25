import React from "react";
import { Modal, Button } from "react-bootstrap";
import { CLOSE_END_POPUP } from "./assessmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_FIXED_RESULT } from "./assessmentSlice";

export default function EndResult() {
  const dispatch = useDispatch();
  const endPopupCSS = useSelector(
    (state) => state.assessment.present.endPopupCSS
  );
  const result = useSelector((state) => state.assessment.present.result);
  const getCategoryIndex = useSelector(
    (state) => state.assessment.present.currentCategoryIndex
  );
  const allCategories = useSelector(
    (state) => state.assessment.present.selectedCategories
  );

  const getCleanResult = useSelector(
    (state) => state.assessment.present.fixedResult
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

  const updateResult = (result) => {
    if (result !== undefined) {
      dispatch(UPDATE_FIXED_RESULT(cleanedResult));
    }
  };

  console.log(updateResult());

  return (
    <>
      <Modal show={endPopupCSS} centered={true} backdrop="static">
        <Modal.Header>
          <Modal.Title>Result for: {getPrevCategory}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{getCleanResult}</Modal.Body>
        <Button
          variant="secondary"
          onClick={() => dispatch(CLOSE_END_POPUP())}
          style={{
            margin: "auto",
            textAlign: "center",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Exit and See Detailed Results
        </Button>
      </Modal>
    </>
  );
}
