import { describe, it, beforeEach, expect } from "vitest";

export class TreeNode {

    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number, left?: TreeNode | number, right?: TreeNode | number) {
        this.value = value;
        if (left) {
            this.left = typeof left === "number" ? new TreeNode(left) : left;
        }
        if (right) {
            this.right = typeof right === "number" ? new TreeNode(right) : right;
        }
    }
}

export class Exercise {

    zigzagLevelOrder(node: TreeNode): number[][] {
        if (node === null) {
            return [];
        }

        let depth = 0;
        const result = [];
        let valuesAtLevel = this.getValuesAtLevel(node, depth);
        while (valuesAtLevel.length !== 0) {
            result.push(valuesAtLevel);
            valuesAtLevel = this.getValuesAtLevel(node, ++depth);
        }

        return result;
    }

    getValuesAtLevel(node: TreeNode, depth = 0, current = 0) {
        const result = [];
        if (!node) {
            return result;
        }

        if (depth === current) {
            return [node.value];
        }

        const left = this.getValuesAtLevel(node.left, depth, current + 1);
        const right = this.getValuesAtLevel(node.right, depth, current + 1);

        if (depth % 2 === 0) {
            result.push(...left, ...right);
        }
        else {
            result.push(...right, ...left);
        }

        return result;
    }
}

describe("Exercise.zigzagLevelOrder", () => {
    let kata: Exercise;

    beforeEach(() => {
        kata = new Exercise();
    });

    it("should handle empty tree", () => {
        expect(kata.zigzagLevelOrder(null)).toStrictEqual([]);
    });

    it("should handle single node tree", () => {
        const root = new TreeNode(1);
        expect(kata.zigzagLevelOrder(root)).toStrictEqual([[1]]);
    });

    it("should handle complete binary tree with three nodes", () => {
        const root = new TreeNode(1, 2, 3);
        expect(kata.zigzagLevelOrder(root)).toStrictEqual([[1], [3, 2]]);
    });

    it("should handle example tree from description", () => {
        const root = new TreeNode(3, 9, new TreeNode(20, 15, 7));
        expect(kata.zigzagLevelOrder(root)).toStrictEqual([[3], [20, 9], [15, 7]]);
    });

    it("should handle unbalanced tree", () => {
        const root = new TreeNode(1, new TreeNode(2, 4));
        expect(kata.zigzagLevelOrder(root)).toStrictEqual([[1], [2], [4]]);
    });

    it("should handle perfect binary tree with 4 levels", () => {
        const root = new TreeNode(1, new TreeNode(2, 4, 5), new TreeNode(3, 6, 7));
        expect(kata.zigzagLevelOrder(root)).toStrictEqual([
            [1],
            [3, 2],
            [4, 5, 6, 7]
        ]);
    });
});
