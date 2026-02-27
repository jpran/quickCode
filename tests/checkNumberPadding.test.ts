import {checkNumberPadding} from "../src/checkNumberPadding";

describe("checkNumberPadding", () => {

    test("empty input", () => {
        expect(checkNumberPadding([])).toBe(0);
    });

    test("no padding uniform length 1", () => {
        expect(checkNumberPadding(["1", "2"])).toBe(1);
    });

    test("no padding uniform length 2", () => {
        expect(checkNumberPadding(["1", "2", "999"])).toBe(1);
    });

    test("no padding variable length (inconclusive) 1", () => {
        expect(checkNumberPadding(["999", "9999"])).toBe(-3);
    });

    test("no padding variable length (inconclusive) 2", () => {
        expect(checkNumberPadding(["99", "999", "9999"])).toBe(-2);
    });

    test("consistent padding", () => {
        expect(checkNumberPadding(["001", "002"])).toBe(3);
    });

    test("consistent padding with overflow", () => {
        expect(checkNumberPadding(["001", "002", "9999"])).toBe(3);
    });

    test("inconsistent padding", () => {
        expect(checkNumberPadding(["01", "002"])).toBe(-1);
    });

});