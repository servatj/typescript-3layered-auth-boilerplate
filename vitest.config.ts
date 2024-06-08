import swc from "unplugin-swc";
import { loadEnv } from "vite";
import { InlineConfig } from "vitest";
import { configDefaults, defineConfig } from "vitest/config";

export const createVitestTestConfig = (testingType: string): InlineConfig => {
  return {
    root: "./",
    globals: true,
    isolate: false,
    passWithNoTests: true,
    include: [`tests/${testingType}/**/*.test.ts`],
    exclude: [...configDefaults.exclude, "node_modules"],
    env: loadEnv("test", process.cwd(), ""),
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: `coverage/${testingType}`,
      include: ["src/**/*.ts"],
      extension: [".ts", ".tsx"],
    },
  };
};

export default defineConfig({
  test: createVitestTestConfig("(unit|e2e)"),
  plugins: [swc.vite({ module: { type: "es6" } })],
});
