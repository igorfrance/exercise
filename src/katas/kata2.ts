import { describe, it, beforeEach, expect } from "vitest";

export class Kata2 {

    groupAnagrams(input: string[]): string[][] {
        const anagrams: Record<string, string[]> = {};

        for (let i = 0; i < input.length; i++) {
            const key = String(input[i])
                .toLowerCase()
                .replace(/\s*/g, "")
                .split("")
                .sort()
                .join("");

            if (anagrams[key]) {
                anagrams[key].push(input[i]);
            }
            else {
                anagrams[key] = [input[i]];
            }
        }

        return Object.values(anagrams);
    }
}

describe("groupAnagrams", () => {
    let kata: Kata2;

    beforeEach(() => {
        kata = new Kata2();
    });

    it("should return 'a' when input is 'a'", () =>
        expect(kata.groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
            .toStrictEqual([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]));

    it("should handle empty input array", () =>
        expect(kata.groupAnagrams([])).toStrictEqual([]));

    it("should handle strings with spaces", () =>
        expect(kata.groupAnagrams(["new york", "work nye"])).toStrictEqual([["new york", "work nye"]]));

    it("should handle mixed case strings", () =>
        expect(kata.groupAnagrams(["Hello", "hello"])).toStrictEqual([["Hello", "hello"]]));

    it("should handle single character strings", () =>
        expect(kata.groupAnagrams(["a", "b", "a"])).toStrictEqual([["a", "a"], ["b"]]));
});
