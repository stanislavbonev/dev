

type Operator = (a: number, b: number) => number;

interface Operation {
  [symbol: string]: Operator;
}

const operand: string = "/";
const num1: number = 7;
const num2: number = 2;

const calcOperations: Operation = {
  "+": (a: number, b: number): number => {
    return a + b;
  },
  "-": (a: number, b: number): number => {
    return a - b;
  },
  "*": (a: number, b: number): number => {
    return a * b;
  },
  "/": (a: number, b: number): number => {
    return a / b;
  },
};

export default calcOperations

const result = (operation: Operator, b: number, c: number): number => {
  return operation(b, c);
};

console.log(calcOperations);

calcOperations[operand]

console.log(calcOperations[operand](3,5))