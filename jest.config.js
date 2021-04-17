/* eslint-disable no-undef */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    window: {
      jestLite: {
        core: {
          describe: null,
          it: null,
          expect: null,
          run: null,
        },
        prettify: null,
      },
    },
  },
};
