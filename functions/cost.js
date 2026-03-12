const offers = require("../offers");

const COST_PER_KG = 10;
const COST_PER_KM = 5;

function calculateTotalCost(baseCost, weight, distance, offerCode) {

  // Validation
  if (typeof baseCost !== "number" || baseCost < 0) {
    throw new Error("Invalid baseCost: must be a number >= 0");
  }

  if (typeof weight !== "number" || weight <= 0) {
    throw new Error("Invalid weight: must be a number > 0");
  }

  if (typeof distance !== "number" || distance < 0) {
    throw new Error("Invalid distance: must be a number >= 0");
  }

  if (offerCode && typeof offerCode !== "string") {
    throw new Error("Invalid offerCode: must be a string");
  }

  // Logic
  let cost = baseCost + (weight * COST_PER_KG) + (distance * COST_PER_KM);
  let discount = 0;
  const offer = offers[offerCode];
  
  if (offer) {
    const validWeight = weight >= offer.minWeight && weight <= offer.maxWeight;
    const validDistance = distance >= offer.minDistance && distance <= offer.maxDistance;

    if (validWeight && validDistance) {
      discount = Math.floor(cost * offer.discount);
    }
  }

  const finalCost = cost - discount;

  return { discount, finalCost };
}

module.exports = calculateTotalCost;