const checkPaddingForSingleValue = (str: string): boolean => {
    return str.length > 1 && str.startsWith("0");
};

/**
 * Ensures all inputs are valid unsigned integer strings.
 */
const validateNumericInput = (arr: string[]): void => {
    for (const s of arr) {
        if (!/^\d+$/.test(s)) {
            throw new Error(`Invalid numeric string: ${s}`);
        }
    }
};

/**
 * Checks whether the dataset contains any zero-padding values.
 */
const checkNoPaddedValues = (arr: string[]): number | undefined => {
    const hasLeadingZero = arr.some(
        s => checkPaddingForSingleValue(s)
    );
    if (hasLeadingZero) return undefined;

    const lengths = arr.map(s => s.length);
    const minLength = Math.min(...lengths);
    if (minLength === 1)
        return 1; // no padding
    else
        return -minLength; // inconclusive
};

/**
 * Checks all padded values have the same padding width.
 */
const checkInconsistentPaddingWidth = (arr: number[]): number | undefined => {
    const uniquePaddedLengths = new Set(arr);
    if (uniquePaddedLengths.size !== 1) {
        return -1; // inconsistent padding widths
    }
}

/**
 * Validates that the inferred padding width P is consistent across the entire dataset.
 */
const checkConsistentPadding = (arr: string[], paddedLengths: number[]): number => {
    const width = paddedLengths[0];
    for (const str of arr) {
        if (str.length < width) return -1;
        if (str.length === width && !str.startsWith("0"))
            return -1;
    }
    return width;
}

/**
 * Main function.
 *
 * Decision Order:
 *   1. Empty input → 0
 *   2. No padding observed → 1 or -minLength
 *   3. Conflicting padded widths → -1
 *   4. Confirm consistent padding → width
 */
export function checkNumberPadding(intStrs: Iterable<string>): number {
    const arr = Array.from(intStrs);

    // If no values passed
    if (arr.length === 0) return 0;

    // To check if all values are numeric
    validateNumericInput(arr);

    // To check if padding exists at all
    const noPadResult = checkNoPaddedValues(arr);
    if (noPadResult !== undefined)
        return noPadResult;

    const padded = arr.filter(
        s => checkPaddingForSingleValue(s)
    );
    const paddedLengths = padded.map(s => s.length);

    // To Ensure padding widths do not inconsistent
    const inconsistent = checkInconsistentPaddingWidth(paddedLengths);
    if (inconsistent !== undefined)
        return inconsistent;

    // To check consistency across all values
    return checkConsistentPadding(arr, paddedLengths);
}