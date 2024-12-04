const fs = require("fs");

const readInputs = (path) => {
  return fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const parseData = (data) => {
  const inputs = [];
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  let matches;
  while ((matches = regex.exec(data)) !== null) {
    const coefficients = matches[0].match(/\d{1,3}/g);
    inputs.push(coefficients);
  }

  return inputs;
};

const sumOfOperation = (arr, callback) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const [x, y] = arr[i];
    const result = callback(x, y);
    sum += result;
  }
  return sum;
};

const mul = (x, y) => {
  return x * y;
};

const data = readInputs("./inputs/2024/input_day_3.txt");
const parsedData = parseData(data);
const sumOfMul = sumOfOperation(parsedData, mul);
console.log(sumOfMul);
