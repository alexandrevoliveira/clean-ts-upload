module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@/tests/(.*)': '<rootDir>/tests/$1'
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
  setupFiles: ['dotenv/config']
}
