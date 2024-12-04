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
  const list = data.split("\n").reduce((accumulator, currentValue) => {
    const dataLine = currentValue.match(/mul\(\d{1,3},\d{1,3}\)/g);
    return [...accumulator, dataLine];
  }, []);

  return list;
};

const data = readInputs("./inputs/2024/input_day_3.txt");
const parsedData = parseData(data);
console.log(parsedData);
