import type { Config } from "jest";

const config: Config = {
  moduleNameMapper: {
    "^axios$": "axios/dist/node/axios.cjs",
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/src/setupTests.js",
  ],
};

export default config;
