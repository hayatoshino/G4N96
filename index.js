import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (date) => {
  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Tạo thời gian ngẫu nhiên từ ngày 1/7/2023 đến 30/9/2023
  const start = moment("2023-03-01");
  const end = moment("2023-12-30");
  const randomDate = moment(random.int(start.valueOf(), end.valueOf())).format();

  console.log(randomDate);

  const data = {
    date: randomDate,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(randomDate, { "--date": randomDate }, makeCommits.bind(this, --n));
  });
};

makeCommits(269);
