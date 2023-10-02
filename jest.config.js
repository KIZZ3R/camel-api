export default {
  bail: true,

  coverageProvider: 'v8',

  testMatch: ['<rootDir>/src/**/*.spec.js'],

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  setupFiles: ['./jest.setup.js'],
}
