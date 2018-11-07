module.exports = {
  transform: { '.*': 'babel-jest' },
  collectCoverage: true,
  coverageReporters: [
    'json',
    'html',
    'text',
  ],
  collectCoverageFrom: [
    'client/**/*.{js,jsx}',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
