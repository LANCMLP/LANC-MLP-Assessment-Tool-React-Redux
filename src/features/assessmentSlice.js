import { createSlice } from "@reduxjs/toolkit";
import {
  data,
  initialCategoriesValue,
  initialIssuesValue,
} from "../features/ReadJSON";
import undoable from "redux-undo";

export const assessmentSlice = createSlice({
  name: "assessment",
  initialState: {
    issues: initialIssuesValue,
    categories: initialCategoriesValue,
    selected: [],
    unselected: [],
    currentTree: data,
    selectDisplay: { display: "none" },
    issueDisplay: {},
    selectedCategories: ["None"],
    selectedIssues: ["None"],
    currentQuestion: [],
    currentOptions: [],
    result: [],
    treeFromSelectedCategories: [],
    selectCSS: { display: "none" },
    remainingCategories: [],
    treeFromSelect: [],
    totalCategories: [],
    currentCategoryIndex: 0,
    currentCategoryName: ["None"],
    treeFromSelectedCategories2: [],
    test: [],
    newTree1: [],
    newTree6: [],
    popupCSS: false,
    endPopupCSS: false,
    newTree5: [],
    subCategoryIndex: 0,
    resultsCSS: { display: "none" },
    fixedResult: null,
    buttonDisabled: true,
    forceUpdate: 0,
    consultCSS: { display: "none" },
  },
  reducers: {
    UPDATE_SELECTED: (state, action) => {
      state.selected = action.payload;
      state.selectedIssues = state.selected;
      state.unselected = initialIssuesValue.filter(
        (item) => !state.selected.includes(item)
      );
    },
    UPDATE_SELECTED2: (state, action) => {
      state.selected = action.payload;
      state.unselected = state.currentOptions.filter(
        (item) => !state.selected.includes(item)
      );
    },
    UPDATE_DISPLAY: (state) => {
      state.selectDisplay = {};
      state.issueDisplay = { display: "none" };
    },
    ENABLE_BUTTON: (state, action) => {
      function test(value) {
        if (value.length > 0) return false;
        else return true;
      }

      console.log(test(action.payload));

      state.buttonDisabled = test(action.payload);
    },
    DISABLE_BUTTON: (state) => {
      state.buttonDisabled = true;
    },
    CLOSE_POPUP: (state) => {
      state.popupCSS = false;
    },
    UPDATE_FIXED_RESULT: (state, action) => {
      state.fixedResult = action.payload;
    },
    CLOSE_END_POPUP: (state) => {
      state.endPopupCSS = false;
    },
    UPDATE_TREE_SELECT: (state) => {
      state.selectDisplay = {};
      state.issueDisplay = { display: "none" };
    },
    UPDATE_CATEGORIES: (state, action) => {
      state.selectedCategories = action.payload;
      state.totalCategories = state.selectedCategories.length;
      state.currentCategoryName = state.selectedCategories[0];
    },
    UPDATE_TREE3: (state) => {
      state.forceUpdate += 1;
      if (state.subCategoryIndex === 0) {
        state.newTree1 = state.treeFromSelectedCategories2.filter(
          (item) =>
            state.treeFromSelectedCategories2.indexOf(item) ===
            state.treeFromSelectedCategories2.indexOf(
              state.currentCategoryName
            ) +
              1
        );

        var newTree2 = state.newTree1.flat(2);
        var newTree3 = newTree2.filter(
          (item) =>
            newTree2.indexOf(item) ===
            newTree2.indexOf(String(state.selected)) + 1
        );
        state.treeFromSelect = newTree3.flat();
        state.treeFromSelectedCategories2 = state.treeFromSelect;
        state.subCategoryIndex = 1;
      } else {
        state.newTree1 = state.treeFromSelectedCategories2.slice(1, 2);
        state.newTree5 = state.newTree1.flat(1);
        var newTree6 = state.newTree5.filter(
          (item) =>
            state.newTree5.indexOf(item) ===
            state.newTree5.indexOf(String(state.selected)) + 1
        );
        state.newTree6 = newTree6;
        state.treeFromSelect = newTree6.flat();
        // state.treeFromSelect = state.newTree5; // this is new
        state.treeFromSelectedCategories2 = state.treeFromSelect;
      }

      state.currentQuestion = state.treeFromSelect.slice(0, 1);
      var getOptions = state.treeFromSelect.slice(1, 2);
      var getOptions2 = getOptions.flat();
      state.currentOptions = getOptions2.filter(
        (item) => Array.isArray(item) === false
      );
      if (state.currentOptions.length === 0) {
        state.selectCSS = { display: "none" };
        state.result = state.result.concat(state.currentQuestion);
        state.currentCategoryIndex += 1;
        state.currentCategoryName =
          state.selectedCategories[state.currentCategoryIndex];

        if (state.currentCategoryIndex === state.totalCategories) {
          state.endPopupCSS = true;
          state.popupCSS = false;
          state.resultsCSS = {};
          state.currentCategoryName = "Assessment Completed";
          var index = state.result.findIndex((element) => {
            if (element.includes("consult") || element.includes("Consult")) {
              return true;
            }
          });
          console.log(index);
          if (index !== -1) {
            state.consultCSS = {};
          } else {
            state.consultCSS = { display: "none" };
          }
        } else {
          state.selectCSS = {};

          state.treeFromSelectedCategories = state.currentTree.filter(
            (item) =>
              state.currentTree.indexOf(item) ===
                state.currentTree.indexOf(state.currentCategoryName) ||
              state.currentTree.indexOf(item) ===
                state.currentTree.indexOf(state.currentCategoryName) + 1
          );

          var toFlat = state.treeFromSelectedCategories.filter(
            (item) => Array.isArray(item) === true
          );
          var flattened = toFlat.flat();

          state.currentQuestion = flattened.slice(0, 1);
          var getOptionsx = flattened.slice(1, 2);
          var getOptions2x = getOptionsx.flat();
          state.currentOptions = getOptions2x.filter(
            (item) => Array.isArray(item) === false
          );
          state.treeFromSelectedCategories2 = state.treeFromSelectedCategories;
          state.popupCSS = true;
          state.subCategoryIndex = 0;
        }
      }
    },
    UPDATE_TREE2: (state) => {
      state.treeFromSelectedCategories = state.currentTree.filter(
        (item) =>
          Array.isArray(item) === true ||
          state.selectedCategories.includes(item)
      );

      if (Array.isArray(state.treeFromSelectedCategories[0]) === true) {
        state.treeFromSelectedCategories =
          state.treeFromSelectedCategories.slice(
            1,
            state.treeFromSelectedCategories.length + 1
          );
      }

      if (Array.isArray(state.treeFromSelectedCategories[0]) === true) {
        state.treeFromSelectedCategories =
          state.treeFromSelectedCategories.slice(
            1,
            state.treeFromSelectedCategories.length + 1
          );
      }

      var toFlat = state.treeFromSelectedCategories.filter(
        (item) => Array.isArray(item) === true
      );
      var flattened = toFlat.flat();

      state.currentQuestion = flattened.slice(0, 1);
      var getOptions = flattened.slice(1, 2);
      var getOptions2 = getOptions.flat();
      state.currentOptions = getOptions2.filter(
        (item) => Array.isArray(item) === false
      );
      state.selectCSS = {};
      state.selectDisplay = { display: "none" };
      state.treeFromSelectedCategories2 = state.treeFromSelectedCategories;
    },
    UPDATE_TREE: (state) => {
      function f(arr, selectedTitle) {
        return arr
          .filter((item) => item.title !== selectedTitle)
          .map((item) => {
            item = Object.assign({}, item);
            if (item.children) {
              item.children = f(item.children, selectedTitle);
            }
            return item;
          });
      }

      if (state.unselected.length === 0) {
        var pruneTreexx = state.currentTree;
      } else {
        for (let i = 0; i < state.unselected.length; i++) {
          pruneTreexx = f(state.currentTree, state.unselected[i]);
        }
      }

      var treeString = JSON.stringify(pruneTreexx);
      var treeFixed = treeString.replaceAll("{", "");
      var treeFixed2 = treeFixed.replaceAll("}", "");
      var treeFixed3 = treeFixed2.replaceAll('"title":', "");
      var treeFixed4 = treeFixed3.replaceAll('"children":', "");
      var tada = JSON.parse(treeFixed4);

      var prune2 = tada.filter(
        (i, idx) =>
          state.selected.includes(i) ||
          (Array.isArray(tada[idx - 1]) === false &&
            state.selected.includes(tada[idx - 1]))
      );

      var prune3 = prune2.flat(1);

      var prune4 = prune3.filter(
        (item) => !state.selected.includes(item) && !Array.isArray(item)
      );

      state.currentTree = prune3;
      state.categories = prune4;
      state.selectedIssues = state.selected;
    },
  },
});

export const {
  UPDATE_SELECTED,
  UPDATE_TREE,
  UPDATE_DISPLAY,
  UPDATE_CATEGORIES,
  UPDATE_TREE2,
  UPDATE_SELECTED2,
  UPDATE_TREE_SELECT,
  UPDATE_TREE3,
  CLOSE_POPUP,
  CLOSE_END_POPUP,
  UPDATE_FIXED_RESULT,
  ENABLE_BUTTON,
  DISABLE_BUTTON,
} = assessmentSlice.actions;

const undoableAssessment = undoable(assessmentSlice.reducer, {
  syncFilter: true,
  ignoreInitialState: false,
  limit: false,
});

export default undoableAssessment;
