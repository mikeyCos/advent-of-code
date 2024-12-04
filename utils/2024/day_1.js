const fs = require("fs");

/*

Questions:

1. What if left and right lists vary in length?
2. How to handle negative numbers?

*/
const args = process.argv;

const readInputs = (path) => {
  return fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const parseData = (data) => {
  const lists = data.split("\n").reduce(
    (accumulator, currentPair) => {
      const [x, y] = currentPair.split(/[ ,]+/);
      return {
        ...accumulator,
        left: [...accumulator.left, x],
        right: [...accumulator.right, y],
      };
    },
    { left: [], right: [] }
  );

  return lists;
};

const calculateTotalDistance = (arr1, arr2) => {
  const sortedArr1 = arr1.sort();
  const sortedArr2 = arr2.sort();

  const totalDistance = sortedArr1.reduce(
    (accumulator, currentValue, currentIndex) => {
      return accumulator + Math.abs(currentValue - sortedArr2[currentIndex]);
    },
    0
  );

  return totalDistance;
};

const calculateSimilarityScore = (arr1, arr2) => {
  // How to set a counter object?
  // counter = { 1: 7, 2: 1 }
  /* const similarityScore = arr1.reduce((accumulator, currentValue) => {
    const multiple = arr2.filter((num) => num === currentValue).length;
    return accumulator + currentValue * multiple;
  }, 0);

  return similarityScore; */

  // const arr2Counts = arr2.reduce((accumulator, key) => {
  //   return {
  //     ...accumulator,
  //     [key]: accumulator[key] === undefined ? 0 : accumulator[key] + 1,
  //   };
  // }, {});

  const arr2Counts = arr2.reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: (accumulator[key] ?? 0) + 1,
    };
  }, {});

  const similarityScore = arr1.reduce((accumulator, key) => {
    const multiple = arr2Counts[key] ?? 0;
    return {
      ...accumulator,
      similarityScore: accumulator.similarityScore + key * multiple,
    };
  }, 0);

  return similarityScore;
};

const day_1 = () => {
  const data = readInputs("./inputs/2024/input_day_1.txt");
  const parsedData = parseData(data);
  const [leftList, rightList] = Object.values(parsedData);
  const totalDistance = calculateTotalDistance(leftList, rightList);
  const similarityScore = calculateSimilarityScore(leftList, rightList);

  return { totalDistance, similarityScore };
};

const data = readInputs("./inputs/2024/input_day_1.txt");
const parsedData = parseData(data);
const [leftList, rightList] = Object.values(parsedData);
const totalDistance = calculateTotalDistance(leftList, rightList);
const similarityScore = calculateSimilarityScore(leftList, rightList);
console.log("totalDistance:", totalDistance);
console.log("similarityScore:", similarityScore);

module.exports = { day_1 };

/* 

In terminal

node utils/2024/day_1.js

OR 

node -e 'console.log(require("./utils/2024/day_1.js").day_1())'

Based on ./inputs/2024/input_day_1.txt
totalDistance: 1666427
similarityScore: 24316233

*/
