/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>/src', '<rootDir>/test'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/test/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts']
};
