import {checkNumberPadding} from "./checkNumberPadding";

function main(): void {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error("Usage: node dist/index.js <num1> <num2> ...");
        process.exit(1);
    }

    try {
        const result = checkNumberPadding(args);
        console.log(result);
    } catch (error) {
        console.error(
            error instanceof Error ? error.message : "Unexpected error"
        );
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

export {checkNumberPadding};