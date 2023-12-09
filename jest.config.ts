import type { Config } from 'jest';

const jestConfig: Config = {
  testEnvironment: 'node',
  rootDir: 'src',
  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default jestConfig;
