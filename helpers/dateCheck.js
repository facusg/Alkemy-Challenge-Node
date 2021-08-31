const moment = require("moment");

const dateCheck = (date) => {
  const regex = new RegExp(
    /[12]\d{3}-(0[1-9]|1[0-2]|[1-9])-(0[1-9]|[12]\d|3[01]|[1-9]\b)/
  );
  const isValidDate = date.match(regex);

  if (isValidDate) {
    console.log(date);
    return date;
  } else {
    return false;
  }

  /*  if (moment(date).isValid()) {
    let newDate = moment(date, "MM-DD-YYYY")
      .toISOString()
      .replace(/T/, " ")
      .replace(/:00.000Z/, "")
      .replace(/03:00/, "");

   */
};

module.exports = { dateCheck };
