module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/reportWebVitals.js",
    "!src/setupTests.js",
    "!src/App.js",
    "!src/mocks/*",
    "src/**/*/*.test.{js,jsx}",
    "!src/**/App.js",
  ],
};
