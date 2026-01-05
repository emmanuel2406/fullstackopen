export type Operation = "multiply" | "add" | "divide";

interface CalculatorValues {
  value1: number;
  value2: number;
  operation: Operation;
}

const parseArguments = (args: string[]): CalculatorValues => {
  if (args.length < 5) throw new Error("Not enough arguments");
  if (args.length > 5) throw new Error("Too many arguments");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Provided values were not numbers");
  }

  return {
    value1: Number(args[2]),
    value2: Number(args[3]),
    operation: args[4] as Operation,
  };
};

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) {
        throw new Error("Can't divide by 0!");
      }
      return a / b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

if (require.main === module) {
  try {
    const { value1, value2, operation } = parseArguments(process.argv);
    console.log(calculator(value1, value2, operation));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
