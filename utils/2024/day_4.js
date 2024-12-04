const fs = require("fs");

// Yeah... I don't think I will try to attempt this one =(

const readInputs = (path) => {
  return fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const data = readInputs("./inputs/2024/input_day_4.txt");
console.log(data);
