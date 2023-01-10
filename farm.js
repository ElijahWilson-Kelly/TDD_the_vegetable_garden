// Helper Functions

// Return number that when multiplied by a value changes that value by given percent
const percentageChangeToDecimal = (percentage) => 1 + percentage / 100;

// Round number to specified number of decimal points
const roundValueToXDecimalPoints = (value, numberOfDecimalPoints) => {
  const multiplier = 10 ** numberOfDecimalPoints;
  return Math.round(value * multiplier) / multiplier;
};

// Return yield for plant depending on environment
const getYieldForPlant = (plant, environmentFactors = {}) => {
  let plantYield = plant.yield;

  for (const environment in environmentFactors) {
    if (plant.factor[environment] === undefined) continue;

    const factorAmount = environmentFactors[environment];
    const percentageChange = plant.factor[environment][factorAmount];
    plantYield *= percentageChangeToDecimal(percentageChange);
    plantYield = roundValueToXDecimalPoints(plantYield, 2);
  }
  return plantYield;
};

// Return total yield for crop
const getYieldForCrop = ({ crop, numCrops }, environmentFactors) => {
  return getYieldForPlant(crop, environmentFactors) * numCrops;
};

// Return total yield for multiple crops
const getTotalYield = ({ crops }, environmentFactors) => {
  let result = 0;
  crops.forEach((crop) => {
    result += getYieldForCrop(crop, environmentFactors);
  });
  return result;
};

// Return cost for planting crop
const getCostsForCrop = ({ crop, numCrops }) => crop.cost * numCrops;

// Return revenue from crop
const getRevenueForCrop = ({ crop, numCrops }, environmentFactors) => {
  return (
    getYieldForCrop({ crop, numCrops }, environmentFactors) * crop.salePrice
  );
};

// Returns profit for crop
const getProfitForCrop = (crop, environmentFactors) => {
  const revenue = getRevenueForCrop(crop, environmentFactors);
  const costs = getCostsForCrop(crop);
  return revenue - costs;
};

// Returns total profit from multipleCrops
const getTotalProfit = ({ crops }, environmentFactors) => {
  return crops.reduce((result, currentCrop) => {
    return result + getProfitForCrop(currentCrop, environmentFactors);
  }, 0);
};

// Exporting functions
module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
