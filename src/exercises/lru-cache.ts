import { describe, it, expect } from "vitest";

class LRUCache {

    private cache: Map<number, number> = new Map();

    constructor(readonly size: number) {
    }

    get(key: number) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key: number, value: number) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.cache.size > this.size) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}

describe("LRUCache.get", () => {

    it("scenario 1", () => {
        const lru = new LRUCache(3);
        lru.put(1, 1);
        lru.put(2, 2);
        lru.put(3, 3);
        expect(lru.get(2)).toEqual(2);
    });

    it("scenario 2", () => {
        const lru = new LRUCache(2);
        lru.put(1, 1);
        lru.put(2, 2);
        lru.put(3, 3);
        expect(lru.get(1)).toEqual(-1);
        expect(lru.get(2)).toEqual(2);
    });

    it("scenario 3", () => {
        const lru = new LRUCache(2);
        lru.put(1, 1);
        lru.put(2, 2);
        lru.put(1, 10);
        expect(lru.get(1)).toEqual(10);
        expect(lru.get(2)).toEqual(2);
    });

});
