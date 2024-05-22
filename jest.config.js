module.exports = {
    roots: ['<rootDir>/'],
    testMatch: ['**/__tests__/**/*.+(js|jsx)', '**/?(*.)+(spec|test).+(js|jsx)'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    testEnvironment: 'jsdom',
};