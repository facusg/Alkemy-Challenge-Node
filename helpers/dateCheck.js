const moment = require("moment");

const dateCheck = (date) => {
  if (moment(date).isValid()) {
    let newDate = moment(date, "MM-DD-YYYY")
      .toISOString()
      .replace(/T/, " ")
      .replace(/:00.000Z/, "")
      .replace(/03:00/, "");

    return newDate;
  } else {
    return false;
  }
};

module.exports = { dateCheck };

/* const fecha = moment(date);
  if (fecha.isValid()) {
    return res.status(401).json({ msg: "xd " });
  }
  console.log(moment(date).format("YYYY MM DD")); */
