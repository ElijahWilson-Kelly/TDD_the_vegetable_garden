// Helper Functions

const percentageChangeToDecimal = (percentage) => 1 + percentage / 100;

// Return yield for plant
const getYieldForPlant = (plant, environmentFactors = {}) => {
  let plantYield = plant.yield;

  for (const givenFactor in environmentFactors) {
    if (plant.factor[givenFactor] === undefined) continue;

    const factorAmount = environmentFactors[givenFactor];
    const percentageChangeForFactorAmount =
      plant.factor[givenFactor][factorAmount];
    plantYield *= percentageChangeToDecimal(percentageChangeForFactorAmount);
  }
  return plantYield;
};

// Return total yield for crop
const getYieldForCrop = ({ crop, numCrops }) => {
  return getYieldForPlant(crop) * numCrops;
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
const getCostsForCrop = (plant) => plant.cost;

// Returns revenue for a given crop, yield * sell price
const getRevenueForCrop = ({ crop, numCrops }) => {
  return getYieldForCrop({ crop, numCrops }) * crop.salePrice;
};

const getProfitForCrop = ({ crop, numCrops }) => {
  const revenue = getRevenueForCrop({ crop, numCrops });
  const costs = numCrops * crop.cost;
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
