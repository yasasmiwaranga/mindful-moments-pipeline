module.exports = {
  roots: ['<rootDir>/src'], // your source/test files directory
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // match test files
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './test-results', outputName: 'results.xml' }]
  ],
};
