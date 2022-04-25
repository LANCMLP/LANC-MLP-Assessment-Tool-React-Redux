import { configureStore } from "@reduxjs/toolkit";
import undoableAssessment from "../features/assessmentSlice";

export default configureStore({
  reducer: {
    assessment: undoableAssessment,
  },
});
