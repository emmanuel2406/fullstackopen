interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const formulaBmi = (height_cm: number, weight_kg: number): number => {
  const height_m: number = height_cm / 100;
  if (height_m <= 0 || weight_kg <= 0) {
    throw new Error("Height and weight must be positive");
  }
  const bmi: number = weight_kg / (height_m * height_m);
  return bmi;
};

const getBmiCategory = (bmi: number): string => {
  if (bmi < 0) {
    throw new Error("BMI cannot be negative");
  } else if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25.0) {
    return "Normal range";
  } else if (bmi < 30.0) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35.0) {
    return "Obese (Class I)";
  } else if (bmi < 40.0) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

const calculateBmi = (height_cm: number, weight_kg: number): string => {
  const bmi: number = formulaBmi(height_cm, weight_kg);
  const bmiCategory: string = getBmiCategory(bmi);
  return bmiCategory;
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
