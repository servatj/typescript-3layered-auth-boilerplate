import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

import { createVitestTestConfig } from "./vitest.config";

export default defineConfig({
  test: createVitestTestConfig("e2e"),
  plugins: [swc.vite({ module: { type: "es6" } })],
});
