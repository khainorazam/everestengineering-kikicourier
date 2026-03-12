const offers = require("../offers");

const COST_PER_KG = 10;
const COST_PER_KM = 5;

function calculateTotalCost(baseCost, weight, distance, offerCode) {

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