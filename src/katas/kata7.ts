import { describe, it, expect } from "vitest";

export class WordBreak {
    static canSegment(word: string, dict: string[]): boolean {
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
}

describe("WordBreak.canSegment", () => {

    it("leetcode", () =>
        expect(WordBreak.canSegment("leetcode", ["leet", "code"])).toBe(true));

    it("applepenapple", () =>
        expect(WordBreak.canSegment("applepenapple", ["apple", "pen"])).toBe(true));

    it("catsandog", () =>
        expect(WordBreak.canSegment("catsandog", ["cats", "dog", "sand", "and", "cat"])).toBe(false));

});
