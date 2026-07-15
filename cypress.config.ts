import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  // allowCypressEnv: false,

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/tests/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
});
