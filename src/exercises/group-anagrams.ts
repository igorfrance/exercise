import { describe, it, expect } from "vitest";

function groupAnagrams(input: string[]): string[][] {
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

describe("groupAnagrams", () => {

    it("should return 'a' when input is 'a'", () =>
        expect(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
            .toStrictEqual([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]));

    it("should handle empty input array", () =>
        expect(groupAnagrams([])).toStrictEqual([]));

    it("should handle strings with spaces", () =>
        expect(groupAnagrams(["new york", "work nye"])).toStrictEqual([["new york", "work nye"]]));

    it("should handle mixed case strings", () =>
        expect(groupAnagrams(["Hello", "hello"])).toStrictEqual([["Hello", "hello"]]));

    it("should handle single character strings", () =>
        expect(groupAnagrams(["a", "b", "a"])).toStrictEqual([["a", "a"], ["b"]]));
});
