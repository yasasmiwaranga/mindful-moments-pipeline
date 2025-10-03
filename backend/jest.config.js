module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"], // adjust if your tests are elsewhere
  reporters: ["default", "jest-junit"],
  verbose: true
};
