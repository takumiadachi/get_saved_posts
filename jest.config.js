const {
  pathsToModuleNameMapper
} = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const {
  compilerOptions
} = require('./tsconfig');

// jest.config.js
module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  coveragePathIgnorePatterns: ["/node_modules/", "./node_modules", "./dist/*"],
  moduleFileExtensions: ["ts", "tsx", "js"]
};