import { describe, it, expect } from "vitest";

type N = number | string | boolean | null | N[];

function flattenArray(list: N[]): N[] {
    const result: N[] = [];
    const stack = [...list];

    while (stack.length) {
        const item = stack.shift();
        if (Array.isArray(item)) {
            stack.unshift(...item);
        }
        else {
            result.push(item);
        }
    }
    return result;
}

describe("flattenArray", () => {

    it("empty", () =>
        expect(flattenArray([])).toStrictEqual([]));

    it("flattens an array (1)", () =>
        expect(flattenArray([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, 3, 4, 5]));

    it("flattens an array (2)", () =>
        expect(flattenArray([1, [2, [3, 4], 5], 6])).toStrictEqual([1, 2, 3, 4, 5, 6]));

    it("flattens an array (3)", () =>
        expect(flattenArray([1, [2, [3, "a"], [true, null]]]))
            .toStrictEqual([1, 2, 3, "a", true, null]));

});

