// Typically one liners, but make it much easier to read in larger files
export const minLengthCheck = (inputToTest: string, length: number) => {
  return inputToTest.length >= length;
};

export const equalityCheck = (inputA: string, inputB: string) =>
  inputA === inputB;

export const regexCheck = (inputToTest: string, regex: RegExp) => {
    return regex.test(inputToTest)
}
