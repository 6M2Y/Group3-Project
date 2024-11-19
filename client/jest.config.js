module.exports = {
    roots: ['<rootDir>/src'], // Angi at testene ligger i `src`-mappen
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transpiler TypeScript-filer med `ts-jest`
    },
    testMatch: [
      '**/?(*.)+(test).[tj]s?(x)', // Finn alle testfiler som slutter med `.test.tsx` eller `.test.js`
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'], // Støttede filtyper
    testEnvironment: 'jsdom', // Angi miljø for frontend-testing
  };
  