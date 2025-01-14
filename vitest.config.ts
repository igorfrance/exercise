import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["src/katas/*.ts"],
        exclude: ["**/lib/**"],
    },
});
