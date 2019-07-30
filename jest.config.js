module.exports = {
  preset: 'ts-jest',
  verbose: true,
  rootDir: '.',
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  transform: {
    "^.+\\.(ts|js)$": "ts-jest"
  },
  collectCoverage: false, // please enable coverage in command line. When enabled, debug is not working and stacktrace line numbers are wrong
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*'
  ],
  testMatch: [
    '<rootDir>/spec/unit/**/*.spec.(js|jsx|ts|tsx)',
    '<rootDir>/spec/e2e/**/*.e2e-spec.(js|jsx|ts|tsx)'
  ],
  testEnvironment: 'node',
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      'pageTitle': 'Test Report',
      'outputPath': './reports/test-results.html',
      'includeFailureMsg': true
    }]
  ],
  coverageReporters: [
    'text',
    'html',
    'cobertura'
  ],
  globals: {
    "ts-jest": {
      diagnostics: true
    }
  }
}
