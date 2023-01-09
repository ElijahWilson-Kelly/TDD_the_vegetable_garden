// Helper Functions

// Change percentage change to decimal number to multiply
const percentageChangeToDecimal = (percentage) => 1 + percentage / 100;

// Round number to specified number of decimal points
const roundValueToXDecimalPoints = (value, numberOfDecimalPoints) => {
  const multiplier = 10 ** numberOfDecimalPoints;
  return Math.round(value * multiplier) / multiplier;
};

// Return yield for plant
const getYieldForPlant = (plant, environmentFactors = {}) => {
  let plantYield = plant.yield;

  for (const environment in environmentFactors) {
    if (plant.factor[environment] === undefined) continue;

    const factorAmount = environmentFactors[environment];
    const percentageChangeForFactorAmount =
      plant.factor[environment][factorAmount];
    plantYield *= percentageChangeToDecimal(percentageChangeForFactorAmount);

    plantYield = roundValueToXDecimalPoints(plantYield, 2);
  }
  return plantYield;
};

// Return total yield for crop
const getYieldForCrop = ({ crop, numCrops }, environmentFactors) => {
  return getYieldForPlant(crop, environmentFactors) * numCrops;
};

// Return total yield for multiple crops
const getTotalYield = ({ crops }) => {
  let result = 0;
  crops.forEach((crop) => {
    result += getYieldForCrop(crop);
  });
  return result;
};

// Returns cost of planting given plant
const getCostsForCrop = ({ crop, numCrops }) => crop.cost * numCrops;

// Returns revenue for a given crop
const getRevenueForCrop = ({ crop, numCrops }) => {
  return getYieldForCrop({ crop, numCrops }) * crop.salePrice;
};

// Returns Profit for a given crop
const getProfitForCrop = ({ crop, numCrops }) => {
  const revenue = getRevenueForCrop({ crop, numCrops });
  const costs = getCostsForCrop({ crop, numCrops });
  return revenue - costs;
};

// Exporting functions
module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
};
