import { parser } from "../path";
import type { TestResult } from "../path";

const data1: TestResult = {
  duration: 1,
  errors: [],
  status: "pass",
  testPath: ["ROOT_DESCRIBE_BLOCK", "sum(a, b)", "sum(1, 2) should be 3"],
};

const data2: TestResult = {
  duration: 0,
  errors: [],
  status: "pass",
  testPath: ["ROOT_DESCRIBE_BLOCK", "sum(a, b)", "sum(1, -1) should be 0"],
};

const data3: TestResult = {
  duration: 2,
  errors: ["error message"],
  status: "fail",
  testPath: ["ROOT_DESCRIBE_BLOCK", "sum(a, b, c)", "sum(1, 2, 3) should be 6"],
};

const clone = (o: object) => {
  return JSON.parse(JSON.stringify(o));
};

describe("pathResolve", () => {
  test("simple node pass", () => {
    expect(parser([clone(data1)])).toMatchObject({
      ROOT_DESCRIBE_BLOCK: {
        "sum(a, b)": {
          "sum(1, 2) should be 3": {
            duration: 1,
            errors: [],
            status: "pass",
          },
        },
      },
    });
  });

  test("simple node fail", () => {
    expect(parser([clone(data3)])).toMatchObject({
      ROOT_DESCRIBE_BLOCK: {
        "sum(a, b, c)": {
          "sum(1, 2, 3) should be 6": {
            duration: 2,
            errors: ["error message"],
            status: "fail",
          },
        },
      },
    });
  });

  test("multiple node, same describe", () => {
    const result = parser([clone(data1), clone(data2)]);
    expect(result).toMatchObject({
      ROOT_DESCRIBE_BLOCK: {
        "sum(a, b)": {
          "sum(1, 2) should be 3": {
            duration: 1,
            errors: [],
            status: "pass",
          },
          "sum(1, -1) should be 0": {
            duration: 0,
            errors: [],
            status: "pass",
          },
        },
      },
    });
  });

  test("multiple node, unsame describe", () => {
    const result = parser([clone(data1), clone(data2), clone(data3)]);
    expect(result).toMatchObject({
      ROOT_DESCRIBE_BLOCK: {
        "sum(a, b)": {
          "sum(1, 2) should be 3": {
            duration: 1,
            errors: [],
            status: "pass",
          },
          "sum(1, -1) should be 0": {
            duration: 0,
            errors: [],
            status: "pass",
          },
        },
        "sum(a, b, c)": {
          "sum(1, 2, 3) should be 6": {
            duration: 2,
            errors: ["error message"],
            status: "fail",
          },
        },
      },
    });
  });
});
