export const data = require("/Users/Anthony/React Apps/MLP Assessment Tool - React Redux/src/Data/MLPTreeData.json");
export const initialIssuesValue = [];

export const initialCategoriesValue = [];

export const parentChildArray = [];

const colorIndex = [
  "blue",
  "red",
  "orange",
  "green",
  "purple",
  "teal",
  "black",
  "brown",
  "pink",
  "maroon",
  "violet",
  "grey",
];

for (let i = 0; i < data.length; i++) {
  let result = data[i].title;
  initialIssuesValue.push(result);
}

for (let i = 0; i < data.length; i++) {
  for (let x = 0; x < data[i].children.length; x++) {
    let result = data[i].children[x].title;
    initialCategoriesValue.push(result);
  }
}

for (let i = 0; i < data.length; i++) {
  for (let x = 0; x < data[i].children.length; x++) {
    let parentChildObject = {};

    parentChildObject.parent = data[i].title;
    parentChildObject.child = data[i].children[x].title;
    parentChildObject.color = colorIndex[i];
    parentChildArray.push(parentChildObject);
  }
}

// const treeData = [
//   {
//     title: "1",
//     key: "1",
//     children: [
//       {
//         title: "1-1",
//         key: "1-1",
//         children: [
//           {
//             title: "1-1-1",
//             key: "1-1-1",
//           },
//           {
//             title: "1-1-2",
//             key: "1-1-2",
//           },
//         ],
//       },
//       {
//         title: "1-2",
//         key: "1-2",
//       },
//       {
//         title: "1-3",
//         key: "1-3",
//       },
//       {
//         title: "1-4",
//         key: "1-4",
//       },
//     ],
//   },
// ];

// function f(arr, selectedKey) {
//   return arr
//     .filter((item) => item.key !== selectedKey)
//     .map((item) => {
//       item = Object.assign({}, item);
//       if (item.children) {
//         item.children = f(item.children, selectedKey);
//       }
//       return item;
//     });
// }
