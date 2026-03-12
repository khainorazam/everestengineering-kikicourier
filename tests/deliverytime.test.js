const scheduleDeliveries = require("../functions/deliverytime");

describe("scheduleDeliveries", () => {

  test("schedules deliveries with a single vehicle", () => {
    const packages = [
      { weight: 10, distance: 50, inputIndex: 0 },
      { weight: 20, distance: 30, inputIndex: 1 }
    ];
    const vehicleCount = 1;
    const maxSpeed = 50; // km/h
    const maxLoad = 30;

    const result = scheduleDeliveries(packages, vehicleCount, maxSpeed, maxLoad);

    // All packages delivered
    expect(result.length).toBe(2);

    // Check deliveryTime is calculated correctly
    expect(result[0].deliveryTime).toBeCloseTo(1, 2); // 50 / 50 = 1
    expect(result[1].deliveryTime).toBeCloseTo(0.6, 2); // 30 / 50 = 0.6

    // Original input order preserved
    expect(result.map(p => p.inputIndex)).toEqual([0, 1]);
  });

  test("schedules deliveries with multiple vehicles", () => {
    const packages = [
      { weight: 10, distance: 50, inputIndex: 0 },
      { weight: 20, distance: 30, inputIndex: 1 },
      { weight: 15, distance: 20, inputIndex: 2 },
    ];
    const vehicleCount = 2;
    const maxSpeed = 50;
    const maxLoad = 30;

    const result = scheduleDeliveries(packages, vehicleCount, maxSpeed, maxLoad);

    // All packages delivered
    expect(result.length).toBe(3);

    // Original input order preserved
    expect(result.map(p => p.inputIndex)).toEqual([0, 1, 2]);

    // Each package should have a deliveryTime assigned
    result.forEach(pkg => {
      expect(pkg.deliveryTime).toBeDefined();
      expect(pkg.deliveryTime).toBeGreaterThanOrEqual(0);
    });
  });

  test("handles empty package list", () => {
    const packages = [];
    const vehicleCount = 2;
    const maxSpeed = 50;
    const maxLoad = 30;

    const result = scheduleDeliveries(packages, vehicleCount, maxSpeed, maxLoad);

    expect(result).toEqual([]);
  });

});