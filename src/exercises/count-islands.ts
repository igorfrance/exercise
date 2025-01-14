import { describe, it, expect } from "vitest";

type binaryPoint = 0 | 1;

class Point {
    x: number;
    y: number;
    island = -1;

    constructor(x: number, y: number, points: binaryPoint[][]) {
        this.x = x;
        this.y = y;
    }

    isConnectedTo(point: Point) {
        return (
            (point.x === this.x && Math.abs(this.y - point.y) === 1) ||
            (point.y === this.y && Math.abs(this.x - point.x) === 1));
    }
}

export class Exercise {

    points: Point[] = [];

    constructor(points: binaryPoint[][]) {
        for (let y = 0; y < points.length; y++) {
            for (let x = 0; x < points[y].length; x++) {
                if (points[y][x] === 0) continue;
                this.points.push(new Point(x, y, points));
            }
        }
    }

    countIslands(): number {
        if (this.points.length === 0) return 0;

        let island = 0;
        for (const point1 of this.points) {
            if (point1.island === -1) {
                point1.island = island++;
            }

            for (const point2 of this.points) {
                if (point2.isConnectedTo(point1)) {
                    point2.island = point1.island;
                }
            }
        }
        return island;
    }
}

describe("Exercise.countIslands", () => {

    it("should count islands correctly (1)", () =>
        expect(new Exercise([
            [1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1]
        ]).countIslands()).toBe(5));

    it("should count islands correctly (2)", () =>
        expect(new Exercise([
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1]
        ]).countIslands()).toBe(3));

    it("should handle empty grid", () =>
        expect(new Exercise([]).countIslands()).toBe(0));

    it("should handle grid with only water", () =>
        expect(new Exercise([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]).countIslands()).toBe(0));

    it("should handle grid with only land", () =>
        expect(new Exercise([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]).countIslands()).toBe(1));

    it("should handle multiple separate islands", () =>
        expect(new Exercise([
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1]
        ]).countIslands()).toBe(3));

    it("should handle diagonal lands as separate islands", () =>
        expect(new Exercise([
            [1, 0, 1],
            [0, 1, 0],
            [1, 0, 1]
        ]).countIslands()).toBe(5));

    it("should handle single-cell island", () =>
        expect(new Exercise([
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 1]
        ]).countIslands()).toBe(2));

    it("should handle complex island shapes", () =>
        expect(new Exercise([
            [1, 1, 0, 1],
            [1, 0, 0, 1],
            [1, 1, 0, 1],
            [0, 0, 0, 1]
        ]).countIslands()).toBe(2));
});
