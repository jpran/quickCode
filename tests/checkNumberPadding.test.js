"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_check_1 = __importDefault(require("fast-check"));
const checkNumberPadding_1 = require("../src/checkNumberPadding");
describe("checkNumberPadding", () => {
    describe("deterministic tests", () => {
        test("empty input", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)([])).toBe(0);
        });
        test("no padding uniform length 1", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)(["1", "2"])).toBe(1);
        });
        test("no padding uniform length 2", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)(["1", "2", "999"])).toBe(1);
        });
        test("no padding variable length (inconclusive) 1", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)(["999", "9999"])).toBe(-3);
        });
        test("no padding variable length (inconclusive) 2", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)(["99", "999", "9999"])).toBe(-2);
        });
        test("consistent padding", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)(["001", "002"])).toBe(3);
        });
        test("consistent padding with overflow", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)(["001", "002", "9999"])).toBe(3);
        });
        test("inconsistent padding", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)(["01", "002"])).toBe(-1);
        });
    });
    describe("property tests", () => {
        test("returns 0 for empty iterable", () => {
            expect((0, checkNumberPadding_1.checkNumberPadding)([])).toBe(0);
        });
        test("if all numbers are padded to fixed length P, result is P", () => {
            fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer({ min: 2, max: 6 }), fast_check_1.default.array(fast_check_1.default.integer({ min: 0, max: 99 }), // restrict
            { minLength: 1 }), (padLength, numbers) => {
                const filtered = numbers.filter(n => n.toString().length < padLength);
                if (filtered.length === 0)
                    return true;
                const padded = filtered.map(n => n.toString().padStart(padLength, "0"));
                return (0, checkNumberPadding_1.checkNumberPadding)(padded) === padLength;
            }));
        });
        test("if all numbers have no leading zeros and equal length → 1", () => {
            fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.array(fast_check_1.default.integer({ min: 1, max: 999 }), { minLength: 1 }), numbers => {
                const strs = numbers.map(n => n.toString());
                const hasLeadingZero = strs.some(s => s.length > 1 && s.startsWith("0"));
                if (hasLeadingZero)
                    return true;
                const lengths = strs.map(s => s.length);
                const minLength = Math.min(...lengths);
                if (minLength === 1) {
                    return (0, checkNumberPadding_1.checkNumberPadding)(strs) === 1;
                }
                return (0, checkNumberPadding_1.checkNumberPadding)(strs) === -minLength;
            }));
        });
    });
});
