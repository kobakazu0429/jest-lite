import { Circus } from "@jest/types";

export interface TestResult
  extends Pick<Circus.TestResult, "duration" | "errors" | "testPath"> {
  status: "pass" | "fail";
}

export type Tree = Record<string, any> | string;

export const pathResolve = (TestResult: TestResult, result: any) => {
  const n0 = TestResult.testPath.shift();
  if (!n0) return;

  const n1 = TestResult.testPath[0];
  const n2 = TestResult.testPath[1];

  if (n2) {
    result[n0] = result[n0] ?? {};
    pathResolve(TestResult, result[n0]);
  } else {
    result[n0] = {
      ...result[n0],
      [n1]: {
        duration: TestResult.duration,
        errors: TestResult.errors,
        status: TestResult.status,
      },
    };
  }
};

export const parser = (testResults: TestResult[]) => {
  const result: Record<string, Tree> = {};
  testResults.forEach((testResult) => {
    pathResolve(testResult, result);
  });
  return result;
};
