import { describe, it, beforeEach, expect } from "vitest";

export class Kata1 {

    stringCompression(input: string): string {
        let seq = [];
        const result = [];
        const chars = input.split("");

        for (let i = 0; i < chars.length; i++) {
            const prev = seq[seq.length - 1];
            if (chars[i] === prev) {
                seq.push(chars[i]);
            }
            else {
                if (seq.length !== 0) {
                    result.push(`${seq[0]}${seq.length}`);
                }

                seq = [chars[i]];
            }
        }

        if (seq.length !== 0) {
            result.push(`${seq[0]}${seq.length}`);
        }

        const resultString = result.join("");
        return resultString.length < input.length ? resultString : input;
    }
}

describe("stringCompression", () => {
    let kata1: Kata1;

    beforeEach(() => {
        kata1 = new Kata1();
    });

    it("should return 'a' when input is 'a'", () =>
        expect(kata1.stringCompression("a")).toBe("a"));

    it("should return 'a2b1c5a3' when input is 'aabcccccaaa'", () =>
        expect(kata1.stringCompression("aabcccccaaa")).toBe("a2b1c5a3"));

    it("should handle alternating characters", () =>
        expect(kata1.stringCompression("abab")).toBe("abab"));

    it("should handle repeated single character", () =>
        expect(kata1.stringCompression("aaaa")).toBe("a4"));
});
