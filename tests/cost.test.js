const calculateTotalCost = require("../functions/cost");

// Mock the offers module
jest.mock("../offers", () => ({
  OFR001: { discount: 0.10, minWeight: 70, maxWeight: 200, minDistance: 0, maxDistance: 199 },
  OFR002: { discount: 0.07, minWeight: 100, maxWeight: 250, minDistance: 50, maxDistance: 150 },
  OFR003: { discount: 0.05, minWeight: 10, maxWeight: 150, minDistance: 50, maxDistance: 250 }
}));

describe("calculateTotalCost", () => {
  
  test("applies discount when offer conditions are met (OFR001)", () => {
    // weight = 100 (between 70-200), distance = 50 (between 0-199)
    const result = calculateTotalCost(100, 100, 50, "OFR001");
    // cost = 100 + 100*10 + 50*5 = 100 + 1000 + 250 = 1350
    // discount = 10% of 1350 = 135
    expect(result).toEqual({ discount: 135, finalCost: 1215 });
  });

  test("applies discount when offer conditions are met (OFR002)", () => {
    // weight = 150 (between 100-250), distance = 100 (between 50-150)
    const result = calculateTotalCost(100, 150, 100, "OFR002");
    // cost = 100 + 1500 + 500 = 2100
    // discount = 7% of 2100 = 147
    expect(result).toEqual({ discount: 147, finalCost: 1953 });
  });

  test("applies discount when offer conditions are met (OFR003)", () => {
    // weight = 50 (between 10-150), distance = 100 (between 50-250)
    const result = calculateTotalCost(50, 50, 100, "OFR003");
    // cost = 50 + 500 + 500 = 1050
    // discount = 5% of 1050 = 52.5 -> floored = 52
    expect(result).toEqual({ discount: 52, finalCost: 998 });
  });

  test("returns 0 discount when weight is out of offer range", () => {
    // weight = 50 < minWeight 70 for OFR001
    const result = calculateTotalCost(100, 50, 50, "OFR001");
    // cost = 100 + 500 + 250 = 850
    expect(result).toEqual({ discount: 0, finalCost: 850 });
  });

  test("returns 0 discount when distance is out of offer range", () => {
    // distance = 200 > maxDistance 199 for OFR001
    const result = calculateTotalCost(100, 100, 200, "OFR001");
    // cost = 100 + 1000 + 1000 = 2100
    expect(result).toEqual({ discount: 0, finalCost: 2100 });
  });

  test("returns full cost when offer code does not exist", () => {
    const result = calculateTotalCost(100, 50, 50, "INVALID");
    // cost = 100 + 500 + 250 = 850
    expect(result).toEqual({ discount: 0, finalCost: 850 });
  });

  test("applies floor to discount correctly", () => {
    // weight = 100, distance = 50, baseCost = 101 for OFR001
    const result = calculateTotalCost(101, 100, 50, "OFR001");
    // cost = 101 + 1000 + 250 = 1351
    // discount = 10% of 1351 = 135.1 -> floored = 135
    expect(result).toEqual({ discount: 135, finalCost: 1216 });
  });

});