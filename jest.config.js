/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    // fix issue with css import: https://stackoverflow.com/a/57350968
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
};