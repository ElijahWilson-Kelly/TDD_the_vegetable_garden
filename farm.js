// Helper Functions
const getYieldForPlant = (plant) => plant.yield;

const getYieldForCrop = ({ crop, numCrops }) => crop.yield * numCrops;

const getTotalYield = function ({ crops }) {
  let result = 0;
  crops.forEach((crop) => {
    result += getYieldForCrop(crop);
  });
  return result;
};

// Exporting functions
module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
};
