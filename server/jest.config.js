module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/tests'],
    testMatch: ['**/*.test.ts'], // Dette sikrer at kun testfiler blir kjørt
  };
  require('dotenv').config();

  
  
  
  