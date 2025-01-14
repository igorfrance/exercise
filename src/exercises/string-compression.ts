import { describe, it, expect } from "vitest";

function compressString(input: string): string {
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

describe("stringCompression", () => {

    it("should return 'a' when input is 'a'", () =>
        expect(compressString("a")).toBe("a"));

    it("should return 'a2b1c5a3' when input is 'aabcccccaaa'", () =>
        expect(compressString("aabcccccaaa")).toBe("a2b1c5a3"));

    it("should handle alternating characters", () =>
        expect(compressString("abab")).toBe("abab"));

    it("should handle repeated single character", () =>
        expect(compressString("aaaa")).toBe("a4"));
});
