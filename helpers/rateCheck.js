const isRateValid = async (rate) => {
  if (rate >= 1 && rate <= 5) {
    return;
  } else {
    throw new Error(`Rate must be between 1 and 5`);
  }
};

module.exports = {
  isRateValid,
};
