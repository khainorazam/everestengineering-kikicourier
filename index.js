const readline = require("readline");
const calculateTotalCost = require("./functions/cost");
const scheduleDeliveries = require("./functions/deliverytime");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let lines = [];

// Ask the user which part to run
rl.question("Which part do you want to run? (1 or 2): ", (part) => {

    const selectedPart = part.trim();

    console.log(`You selected Part ${selectedPart}. Enter input lines (Ctrl+D on Mac, Ctrl+Z on Windows to finish):`);

    rl.on("line", (input) => {
        lines.push(input);
    });

    rl.on("close", () => {

        const [baseCost, packageCount] = lines[0].split(" ").map(Number);

        // Part 1
        if (selectedPart === "1") {
            for (let i = 1; i <= packageCount; i++) {
                if (!lines[i]) break;
                const [id, weight, distance, offerCode] = lines[i].split(" ");
                const result = calculateTotalCost(baseCost, Number(weight), Number(distance), offerCode);
                console.log(`${id} ${result.discount} ${result.finalCost}`);

            }
        }

        // Part 2
        else if (selectedPart === "2") {
            const packages = [];
            for (let i = 1; i <= packageCount; i++) {
                if (!lines[i]) break;
                const [id, weight, distance, offerCode] = lines[i].split(" ");
                const result = calculateTotalCost(baseCost, Number(weight), Number(distance), offerCode);
                packages.push({
                    id,
                    weight: Number(weight),
                    distance: Number(distance),
                    discount: result.discount,
                    finalCost: result.finalCost,
                    offer: offerCode,
                    inputIndex: i - 1
                });
            }

            const [vehicleCount, maxSpeed, maxLoad] = lines[lines.length - 1].split(" ").map(Number);
            const scheduledPackages = scheduleDeliveries(packages, vehicleCount, maxSpeed, maxLoad);

            scheduledPackages.forEach(pkg => {
                console.log(`${pkg.id} ${pkg.discount} ${pkg.finalCost} ${pkg.deliveryTime}`);
            });
        }

        else {
            console.log("Invalid selection. Please choose 1 or 2.");
        }

    });

});