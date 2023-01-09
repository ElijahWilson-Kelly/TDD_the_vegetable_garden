// Return yield for plant
const getYieldForPlant = (plant) => plant.yield;

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

const getCostsForCrop = (plant) => plant.cost;

// Exporting functions
module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
};
