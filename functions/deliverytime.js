function scheduleDeliveries(packages, vehicleCount, maxSpeed, maxLoad) {

    // Validation
    if (!Array.isArray(packages)) {
        throw new Error("Invalid packages: must be an array");
    }

    if (typeof vehicleCount !== "number" || vehicleCount <= 0) {
        throw new Error("Invalid vehicleCount: must be a number > 0");
    }

    if (typeof maxSpeed !== "number" || maxSpeed <= 0) {
        throw new Error("Invalid maxSpeed: must be a number > 0");
    }

    if (typeof maxLoad !== "number" || maxLoad <= 0) {
        throw new Error("Invalid maxLoad: must be a number > 0");
    }

    packages.forEach((pkg, index) => {
        if (typeof pkg.weight !== "number" || pkg.weight <= 0) {
            throw new Error(`Invalid weight for package at index ${index}`);
        }

        if (typeof pkg.distance !== "number" || pkg.distance < 0) {
            throw new Error(`Invalid distance for package at index ${index}`);
        }

        if (typeof pkg.inputIndex !== "number") {
            throw new Error(`Invalid inputIndex for package at index ${index}`);
        }
    });

    // Logic
    let vehicles = new Array(vehicleCount).fill(0);
    let remaining = [...packages];
    let delivered = [];

    while (remaining.length > 0) {

        // Vehicle that becomes available first
        let vehicleIndex = vehicles.indexOf(Math.min(...vehicles));
        let startTime = vehicles[vehicleIndex];

        let delivery = [];
        let deliveryWeight = 0;

        // Backtracking to find the best combination of (most) packages that can fit the maxLoad for the current vehicle
        function findBestCombo(index, combo, weight) {
            // Stop if overweight and pop to try other combinations
            if (weight > maxLoad) return;
        
            // Update delivery if current combo is heavier or if combo is same weight than previous combo but has more packages
            if (weight > deliveryWeight || (weight === deliveryWeight && combo.length > delivery.length)) {
                delivery = [...combo];
                deliveryWeight = weight;
            }
        
            // Try next packages
            for (let i = index; i < remaining.length; i++) {
                combo.push(remaining[i]);
                findBestCombo(i + 1, combo, weight + remaining[i].weight);

                // Backtrack
                combo.pop(); 
            }
        }
        
        // Start with an empty combo and 0 weight
        findBestCombo(0, [], 0);

        let longestTrip = 0;

        delivery.forEach(pkg => {
            let travelTime = pkg.distance / maxSpeed;
            travelTime = Math.floor(travelTime * 100) / 100;
            pkg.deliveryTime = (Math.round(startTime*100) + Math.round(travelTime*100)) / 100;

            delivered.push(pkg);

            // Update longest trip time for this delivery batch
            if (travelTime > longestTrip) {
                longestTrip = travelTime;
            }
        });

        // Assign vehicle availability time
        vehicles[vehicleIndex] = startTime + (2 * longestTrip);

        // Remove delivered packages from remaining
        remaining = remaining.filter(p => !delivery.includes(p));
    }

    // Restore original input order
    delivered.sort((a, b) => a.inputIndex - b.inputIndex);

    return delivered;
}

module.exports = scheduleDeliveries;