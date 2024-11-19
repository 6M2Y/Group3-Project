module.exports = {
    roots: ['<rootDir>/client/src'], // Sørger for at Jest ser i client/src
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Støtte for TypeScript-filer
    },
    testMatch: ['**/tests/**/*.test.[tj]s?(x)'], // Matcher testfiler i tests-mappen
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'], // Støtte for filtyper
    testEnvironment: 'jsdom', // Miljø for React-testing
  };
  