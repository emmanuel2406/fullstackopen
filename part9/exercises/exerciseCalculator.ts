interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  dailyExercises: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  for (let i = 2; i < args.length - 1; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values were not numbers");
    }
  }
  return {
    dailyExercises: args.slice(3).map(Number),
    target: Number(args[2]),
  };
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return "Great job! You've reached your target.";
    case 2:
      return "Not too bad but could be better.";
    case 1:
      return "You didn't exercise enough this period.";
    default:
      throw new Error("Invalid rating");
  }
};

export const calculateExercises = (
  dailyExercises: number[],
  target: number
): Result => {
  const periodLength: number = dailyExercises.length;
  const trainingDays: number = dailyExercises.filter((day) => day > 0).length;
  const average: number =
    dailyExercises.reduce((sum, day) => sum + day, 0) / dailyExercises.length;
  const success: boolean = average >= target;
  const rating: number = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription: string = getRatingDescription(rating);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { dailyExercises, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
