import { describe, it, expect } from "vitest";

export class Exercise {

    static minimumPaintCost(houses: number[][]): number {
        if (houses.length === 0) return 0;
        const totals = Exercise.collectPrices(houses, 0);
        return Math.min(...totals);
    }

    static collectPrices(houses: number[][], from: number): number[] {
        const house = houses[from];
        if (!house) {
            return [];
        }

        const next = Exercise.collectPrices(houses, from + 1);
        if (next.length === 0) {
            return [...house];
        }

        const totals = [];
        for (let i = 0; i < house.length; i++) {
            const totalsForIndex = [];
            for (let j = 0; j < next.length; j++) {
                if (j === i) continue;
                totalsForIndex.push(house[i] + next[j]);
            }
            totals[i] = Math.min(...totalsForIndex);
        }

        return totals;
    }
}

describe("Exercise.minimumCost", () => {

    it("should handle single house", () =>
        expect(Exercise.minimumPaintCost([[1, 2, 3]])).toBe(1));

    it("should handle two houses", () =>
        expect(Exercise.minimumPaintCost([
            [1, 2, 3],
            [4, 5, 6]
        ])).toBe(6));

    it("should handle example case", () =>
        expect(Exercise.minimumPaintCost([
            [17, 2, 17],
            [16, 16, 5],
            [14, 3, 19]
        ])).toBe(10));

    it("should handle empty input", () =>
        expect(Exercise.minimumPaintCost([])).toBe(0));

    it("should handle all same costs", () =>
        expect(Exercise.minimumPaintCost([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ])).toBe(3));

    it("should handle alternating low costs", () =>
        expect(Exercise.minimumPaintCost([
            [1, 5, 5],
            [5, 1, 5],
            [5, 5, 1]
        ])).toBe(3));

    it("should find non-obvious optimal path", () =>
        expect(Exercise.minimumPaintCost([
            [1, 3, 5],
            [2, 4, 6],
            [5, 2, 1],
            [6, 3, 2]
        ])).toBe(9));

    it("should handle large cost differences", () =>
        expect(Exercise.minimumPaintCost([
            [100, 1, 100],
            [100, 100, 1],
            [1, 100, 100],
            [100, 1, 100]
        ])).toBe(4));

    it("should handle four houses with equal min costs", () =>
        expect(Exercise.minimumPaintCost([
            [2, 1, 2],
            [2, 2, 1],
            [1, 2, 2],
            [2, 1, 2]
        ])).toBe(4));

    it("should avoid same color for non-adjacent houses if suboptimal", () =>
        expect(Exercise.minimumPaintCost([
            [1, 10, 10],
            [10, 5, 10],
            [10, 2, 10],
            [1, 10, 10]
        ])).toBe(14));

    it("should handle four houses", () =>
        expect(Exercise.minimumPaintCost([
            [1, 3, 5],
            [2, 4, 6],
            [5, 2, 1],
            [6, 3, 2]
        ])).toBe(9));
});
