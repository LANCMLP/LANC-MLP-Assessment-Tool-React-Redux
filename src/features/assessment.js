import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_SELECTED,
  UPDATE_TREE,
  UPDATE_DISPLAY,
  UPDATE_CATEGORIES,
  UPDATE_TREE2,
  UPDATE_SELECTED2,
  UPDATE_TREE3,
  ENABLE_BUTTON,
  DISABLE_BUTTON,
} from "./assessmentSlice.js";
import EndResult from "./EndResult";
import IntermediateResult from "./IntermediateResult";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";
// import makeAnimated from "react-select/animated";
import "./Components.css";
import chroma from "chroma-js";
import {
  initialCategoriesValue,
  initialIssuesValue,
  parentChildArray,
} from "./ReadJSON";

export function Assessment() {
  const dispatch = useDispatch();
  const issue_options = useSelector((state) => state.assessment.present.issues);
  const category_options = useSelector(
    (state) => state.assessment.present.categories
  );
  const issuesSelected = useSelector(
    (state) => state.assessment.present.selectedIssues
  );
  const displayCSS = useSelector(
    (state) => state.assessment.present.selectDisplay
  );
  const issueCSS = useSelector(
    (state) => state.assessment.present.issueDisplay
  );
  const currentTreeDecision = useSelector(
    (state) => state.assessment.present.treeFromSelectedCategories2
  );
  const forceUpdate = useSelector(
    (state) => state.assessment.present.forceUpdate
  );
  const currentLabel = useSelector(
    (state) => state.assessment.present.currentQuestion
  );
  const currentOptions = useSelector(
    (state) => state.assessment.present.currentOptions
  );
  const selectCSS = useSelector((state) => state.assessment.present.selectCSS);
  const buttonDisabled = useSelector(
    (state) => state.assessment.present.buttonDisabled
  );

  // const animatedcomponents = makeAnimated();

  const getColor1 = (value) => {
    for (let i = 0; i < parentChildArray.length; i++)
      if (value === parentChildArray[i].parent)
        return parentChildArray[i].color;
  };

  const getColor2 = (value) => {
    for (let i = 0; i < parentChildArray.length; i++)
      if (value === parentChildArray[i].child) return parentChildArray[i].color;
  };

  const fixOptionsFunction1 = (arr) => {
    var fixed_options = arr.map((element) => ({
      value: element,
      label: element,
      color: getColor1(element),
    }));

    return fixed_options;
  };

  const getGroup = (value) => {
    for (let i = 0; i < parentChildArray.length; i++)
      if (value === parentChildArray[i].child)
        return parentChildArray[i].parent;
  };

  const fixOptionsFunction2 = (arr) => {
    var fixed_options = arr.map((element) => ({
      value: element,
      label: element,
      color: getColor2(element),
      group: getGroup(element),
    }));

    return fixed_options;
  };

  const fixOptionsFunction3 = (issues, categories) => {
    function myOptions(issue, c) {
      for (let i = 0; i < c.length; i++) {
        var stuff = [];
        if (getGroup(c[i]) === issue) {
          var newOpts = fixOptionsFunction2(c).filter(
            (item) => item.group === issue
          );
        }
        stuff.push(newOpts);
      }
      return stuff.flat(2);
    }

    var fixed_options = issues.map((element) => ({
      label: element,
      options: myOptions(element, categories),
    }));

    return fixed_options;
  };

  const convertSelected = (selected) => {
    var mapped = selected.map((element) => Object.values(element)).flat();
    var set = [...new Set(mapped)];
    var set2 = set.filter((item) => initialIssuesValue.includes(item));
    return set2;
  };

  const convertSelected2 = (selected) => {
    var mapped = Object.values(selected);
    var set = mapped.slice(0, 1);
    console.log(set);
    return set;
  };

  const convertSelected3 = (selected) => {
    var mapped = selected.map((element) => Object.values(element)).flat();
    var set = [...new Set(mapped)];
    var set2 = set.filter((item) => initialCategoriesValue.includes(item));
    return set2;
  };

  function renderSelect() {
    if (currentTreeDecision === undefined) {
    } else {
      return (
        <div style={selectCSS}>
          <label> {currentLabel} </label>
          <br></br>
          <Select
            className="mySelect"
            key={forceUpdate}
            options={fixOptionsFunction1(currentOptions)}
            isMulti={false}
            closeMenuOnSelect={true}
            onChange={(value) => [
              dispatch(UPDATE_SELECTED2(convertSelected2(value))),
              dispatch(ENABLE_BUTTON(convertSelected2(value))),
            ]}
            placeholder={"Please select a response."}
          />
        </div>
      );
    }
  }

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.3).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
    marginLeft: "10px",
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <Form>
      <div style={issueCSS}>
        <Select
          className="mySelect"
          options={fixOptionsFunction1(issue_options)}
          // components={animatedcomponents}
          isMulti={true}
          isSearchable={true}
          closeMenuOnSelect={false}
          onChange={(values) => [
            dispatch(UPDATE_SELECTED(convertSelected(values))),
            dispatch(ENABLE_BUTTON(convertSelected(values))),
          ]}
          placeholder={
            "Click here to select one or more categories. You can start typing to search the list."
          }
          styles={colourStyles}
        />
      </div>

      <div style={displayCSS}>
        <Select
          className="mySelect"
          options={fixOptionsFunction3(issuesSelected, category_options)}
          isMulti={true}
          isSearchable={true}
          closeMenuOnSelect={false}
          onChange={(values) => [
            dispatch(UPDATE_CATEGORIES(convertSelected3(values))),
            dispatch(ENABLE_BUTTON(convertSelected3(values))),
            console.log(values),
          ]}
          placeholder={
            "Click here to select one or more issues. You can start typing to search the list."
          }
          styles={colourStyles}
          formatGroupLabel={formatGroupLabel}
        />
      </div>

      <div style={selectCSS}>{renderSelect()}</div>
      <br></br>
      <IntermediateResult />
      <EndResult />
      <Button
        onClick={() => {
          dispatch(
            UPDATE_TREE(),
            dispatch(UPDATE_DISPLAY(), dispatch(DISABLE_BUTTON()))
          );
        }}
        style={issueCSS}
        disabled={buttonDisabled}
      >
        Choose Categories
      </Button>
      <Button
        style={displayCSS}
        disabled={buttonDisabled}
        onClick={() => dispatch(UPDATE_TREE2(), dispatch(DISABLE_BUTTON()))}
      >
        Choose Issues
      </Button>
      <Button
        style={selectCSS}
        disabled={buttonDisabled}
        onClick={() => dispatch(UPDATE_TREE3(), dispatch(DISABLE_BUTTON()))}
      >
        Next
      </Button>
    </Form>
  );
}
