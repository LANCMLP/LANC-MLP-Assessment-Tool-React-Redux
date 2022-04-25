import React from "react";
import { Button } from "react-bootstrap";
import { ActionCreators } from "redux-undo";
import store from "../app/store";
import { useSelector } from "react-redux";

const UndoRedo = () => {
  const selectCSS = useSelector((state) => state.assessment.present.selectCSS);

  return (
    <div>
      <Button
        style={selectCSS}
        onClick={() => store.dispatch(ActionCreators.jump(-2))}
      >
        Undo
      </Button>
    </div>
  );
};

export default UndoRedo;
