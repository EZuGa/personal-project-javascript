"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scenario_1 = require("./scenario");
const transaction_1 = require("./transaction");
const transaction = new transaction_1.Transaction();
(async () => {
    try {
        await transaction.dispatch(scenario_1.scenario);
        const store = transaction.store; // {} | null
        console.log(store);
        const logs = transaction.logs; // []
        console.log(logs);
        if (![...Object.keys(store)].length) {
            console.log("FAILED: (restored without error)");
        }
        else {
            console.log("SUCCEED");
        }
    }
    catch (err) {
        console.log(err.stack);
        console.log("FAILED: (restored with error)");
    }
})();
