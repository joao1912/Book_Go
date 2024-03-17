/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import * as dotenv from 'dotenv';
dotenv.config();
import type { Config } from 'jest';


const config: Config = {
  
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  globalSetup: './test/util/CleanDataBase.ts',
  globalTeardown: './test/util/CloseServer.ts',

  // moduleNameMapper: {
  //   '@src/(.*)': '<rootDir>/src/$1',
  //   '@test/(.*)': '<rootDir>/test/$1',
  // },

  preset: 'ts-jest',
  resolver: "ts-jest-resolver",
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

};

export default config;
module.exports = {
  preset: "ts-jest",
  resolver: "ts-jest-resolver",
};