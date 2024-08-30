export default {
  testRegex: '.*\\..*(spec|test)\\.ts$',
  modulePaths: ['<rootDir>'],
  testTimeout: 1000 * 1000,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}'],
  testPathIgnorePatterns: [],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 90,
      functions: 90,
      lines: 90,
    },
  },
};
