# Everest Engineering - KikiCourier

A CLI-based package delivery system that calculates delivery costs and schedules deliveries using vehicles.  
Built with Node.js.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Part 1: Calculate Total Cost](#part-1-calculate-total-cost)
  - [Part 2: Schedule Deliveries](#part-2-schedule-deliveries)
- [Testing](#testing)

---

## Project Overview

This project simulates a courier system that:

1. Calculates total delivery cost of packages with optional discounts (offers).  
2. Schedules deliveries efficiently across a limited number of vehicles.

The system is run via a CLI interface where the user enters package data.

---

## Features

- Cost calculation based on:
  - Base cost
  - Weight
  - Distance
  - Offer codes (discounts)
- Delivery scheduling:
  - Supports multiple vehicles
  - Respects maximum speed and load
  - Calculates delivery times
- Input validation to prevent invalid data
- CLI interface for user-friendly interaction
- Fully tested using **Jest**

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/khainorazam/everestengineering-kikicourier.git
```

2. Navigate to the project folder:
```bash
cd everestengineering-kikicourier
```
3. Install dependencies
```bash
npm install
```

___

## Usage

Run the CLI program
```bash
node index.js
```

The program will ask which part to run:
```bash
Which part do you want to run? (1 or 2):
```
- 1 → Calculate total cost of packages
- 2 → Schedule deliveries and calculate delivery times

## Part 1: Calculate Total Cost
<b>Input format:</b>

```bash
<baseCost> <packageCount>
<id> <weight> <distance> <offerCode>
<id> <weight> <distance> <offerCode>
```

<b>Example:</b>
```bash
100 3
PKG1 5 5 OFR001
PKG2 15 5 OFR008
PKG3 10 100 OFR003
```

<b>Example output:</b>
```bash
PKG1 0 750
PKG2 0 1475
PKG3 0 2355
```

## Part 2: Schedule Deliveries
<b>Input format:</b>
Same as Part 1, but the last line specifies vehicle info:
```bash
<vehicleCount> <maxSpeed> <maxLoad>
```

<b>Example input:</b>
```bash
100 5
PKG1 50 30 OFR001
PKG2 75 125 OFR008
PKG3 175 100 OFR003
PKG4 110 60 OFR002
PKG5 155 95 NA
2 70 200
```

<b>Example output:</b>
```bash
PKG1 0 750 3.98
PKG2 0 1475 1.78
PKG3 0 2350 1.42
PKG4 105 1395 0.85
PKG5 0 2125 4.19
```

## Testing
This project uses Jest.
Run all tests:

```bash
npm jest
```

Tests cover:
- Cost calculation with and without offer codes
- Delivery scheduling logic
- Input validation
