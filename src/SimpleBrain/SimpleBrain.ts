

type Operator = (a: number, b: number) => number;

interface Operation {
  [symbol: string]: Operator;
}

const calcOperations: Operation = {
  "+": (a: number, b: number): number => {
    return a + b;
  },
  "-": (a: number, b: number): number => {
    return a - b;
  },
  "x": (a: number, b: number): number => {
    return a * b;
  },
  "/": (a: number, b: number): number => {
    return a / b;
  },
};

export default calcOperations
