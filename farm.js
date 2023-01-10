// Helper Functions

// Return number that when multiplied by a value changes that value by given percent
const percentageChangeToDecimal = (percentage) => 1 + percentage / 100;

// Return number rounded to specific number of decimal places
const roundValueToXDecimalPoints = (value, numberOfDecimalPoints) => {
  const multiplier = 10 ** numberOfDecimalPoints;
  return Math.round(value * multiplier) / multiplier;
};

/*
  ------Main Functions-----
*/

/*
 * @param {object} - crop details
 * @param {object} - environment factors
 * @returns {number} - yield from one plant
 */
const getYieldForPlant = (plant, environmentFactors = {}) => {
  let plantYield = plant.yield;

  for (const environment in environmentFactors) {
    if (plant.factor[environment] === undefined) continue;

    const factorAmount = environmentFactors[environment];
    const percentageChange = plant.factor[environment][factorAmount];
    plantYield *= percentageChangeToDecimal(percentageChange);
  }
  return roundValueToXDecimalPoints(plantYield, 2);
};

/*
 * @param {object} - crop details and number of crops
 * @param {object} - environment factors
 * @returns {number} - yield from multiple plants of the same type
 */
const getYieldForCrop = ({ crop, numCrops }, environmentFactors) => {
  return getYieldForPlant(crop, environmentFactors) * numCrops;
};

/*
 * @param {object} - crops property is an { array } of crops
 * @param {object} - environment factors
 * @returns {number} - yield from multiple crops
 */
const getTotalYield = ({ crops }, environmentFactors) => {
  let result = 0;
  crops.forEach((crop) => {
    result += getYieldForCrop(crop, environmentFactors);
  });
  return result;
};

/*
 * @param {object} - crop details and number of crops
 * @returns {number} - cost for a given crop
 */
const getCostsForCrop = ({ crop, numCrops }) => crop.cost * numCrops;

/*
 * @param {object} - crop details and number of crops
 * @param {object} - environment details
 * @returns {number} - revenue generated from crop
 */
const getRevenueForCrop = ({ crop, numCrops }, environmentFactors) => {
  return (
    getYieldForCrop({ crop, numCrops }, environmentFactors) * crop.salePrice
  );
};

/*
 * @param {object} - crop details and number of crops
 * @param {object} - environment details
 * @returns {number} - profit from one crop
 */
const getProfitForCrop = (crop, environmentFactors) => {
  const revenue = getRevenueForCrop(crop, environmentFactors);
  const costs = getCostsForCrop(crop);
  return revenue - costs;
};

/*
 * @param {object} - crops property is an { array } of crops
 * @param {object} - environment details
 * @returns {number} - total profite from multiple crops
 */
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
