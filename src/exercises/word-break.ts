import { describe, it, expect } from "vitest";

function canSegmentInWords(word: string, dict: string[]): boolean {
    let matchCount = 0;
    let testSubject = word.toLowerCase();
    const words = Array.from(new Set(dict.map(w => w.toLowerCase())));
    for (const word of words) {
        let hasMatched = false;
        testSubject = testSubject.replace(new RegExp(word, "gi"), () => {
            hasMatched = true;
            return "";
        });
        if (hasMatched) matchCount += 1;
    }

    return matchCount === words.length;
}

describe("canSegmentInWords", () => {

    it("leetcode", () =>
        expect(canSegmentInWords("leetcode", ["leet", "code"])).toBe(true));

    it("applepenapple", () =>
        expect(canSegmentInWords("applepenapple", ["apple", "pen"])).toBe(true));

    it("catsandog", () =>
        expect(canSegmentInWords("catsandog", ["cats", "dog", "sand", "and", "cat"])).toBe(false));

});
