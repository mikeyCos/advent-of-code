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
  const reports = data.split("\n").reduce((accumulator, currentValue) => {
    const levels = currentValue.split(" ");
    return [...accumulator, levels];
  }, []);

  return reports;
};

const verifyReports = (arr, callback) => {
  // console.log("traverseReports running...");
  let safetyReportCounter = 0;
  for (let i = 0; i < arr.length; i++) {
    const report = arr[i];
    const isReportSafe = callback(report);
    safetyReportCounter = safetyReportCounter + (isReportSafe ? 1 : 0);
  }

  return safetyReportCounter;
};

const verifyReport = (report) => {
  // The levels are either all increasing or all decreasing.
  // Any two adjacent levels differ by at least one and at most three.
  // console.log("verifyReport running...");
  // console.log(report);
  const results = [];
  let isSafe = true;
  for (let i = 0; i < report.length; i++) {
    const j = i + 1;
    if (j < report.length) {
      const currentLevel = report[i];
      const aheadLevel = report[j];
      const prevResult = results[i - 1];
      const difference = aheadLevel - currentLevel;
      const inBounds = Math.abs(difference) >= 1 && Math.abs(difference) <= 3;
      const isNegative = difference > 0;
      const result = { inBounds, isNegative };
      results.push(result);

      if ((i != 0 && prevResult.isNegative !== isNegative) || !inBounds) {
        isSafe = false;
        break;
      }

      isSafe = true;
    }
  }

  return isSafe;
};

const data = readInputs("./inputs/2024/input_day_2.txt");
const parsedData = parseData(data);
const safetyReportsNum = verifyReports(parsedData, verifyReport);
console.log(safetyReportsNum);
