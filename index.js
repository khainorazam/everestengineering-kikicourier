const readline = require("readline");
const calculateTotalCost = require("./functions/cost");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let lines = [];

rl.on("line", (input) => {
  lines.push(input);
});

// Input ends when CTRL + D (Mac), or CTRL + Z (Windows) is pressed  
rl.on("close", () => {

    const [baseCost, packageCount] = lines[0].split(" ").map(Number);

    for (let i = 1; i <= packageCount; i++) {
        // Check if the line exists to avoid errors when the number of packages is less than specified
        if (!lines[i]) break;

        const [id, weight, distance, offerCode] = lines[i].split(" ");

        const result = calculateTotalCost(baseCost, Number(weight), Number(distance), offerCode);

        console.log(`${id} ${result.discount} ${result.finalCost}`);

    }

});

