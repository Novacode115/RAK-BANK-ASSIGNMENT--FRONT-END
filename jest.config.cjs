/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$":
      "<rootDir>/src/component/__mocks__/fileMock.js",
  },
};
