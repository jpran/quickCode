"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkNumberPadding_1 = require("./checkNumberPadding");
function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Usage: node dist/cli.js <num1> <num2> ...");
        process.exit(1);
    }
    try {
        const result = (0, checkNumberPadding_1.checkNumberPadding)(args);
        console.log(result);
    }
    catch (error) {
        console.error(error instanceof Error ? error.message : "Unexpected error");
        process.exit(1);
    }
}
main();
