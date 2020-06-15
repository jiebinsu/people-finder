module.exports = {
  modulePathIgnorePatterns: ["<rootDir>/app/"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: ["src/**/{!(*.data),}.js", "!src/index.js"],
};
