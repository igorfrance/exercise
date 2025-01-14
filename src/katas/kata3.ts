import { describe, it, beforeEach, expect } from "vitest";

export class Kata3 {

    getSlidingMaximums(input: number[], size: number): number[] {
        const result = [];
        let startIndex = 0;

        while (startIndex + size <= input.length) {
            const window = input.slice(startIndex, startIndex + size);
            result.push(Math.max(...window));
            startIndex += 1;
        }

        return result;
    }
}

describe("Array.getSlidingMaximums", () => {
    let kata: Kata3;

    beforeEach(() => {
        kata = new Kata3();
    });

    it("should work correctly", () =>
        expect(kata.getSlidingMaximums([1, 3, -1, -3, 5, 3, 6, 7], 3))
            .toStrictEqual([3, 3, 5, 5, 6, 7]));

    it("should handle window size 1", () =>
        expect(kata.getSlidingMaximums([1, 2, 3], 1))
            .toStrictEqual([1, 2, 3]));

    it("should handle window size equal to array length", () =>
        expect(kata.getSlidingMaximums([1, 2, 3], 3))
            .toStrictEqual([3]));

    it("should handle negative numbers", () =>
        expect(kata.getSlidingMaximums([-1, -2, -3], 2))
            .toStrictEqual([-1, -2]));
});
