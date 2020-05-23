interface ExerciseMetrics {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface ExerciseValues {
  target: number;
  hours: Array<number>;
}

const parseArgument = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const startArgs = args.splice(0, 3);
  const hours: Array<number> = [];
  args.forEach((arg) => {
    if (!isNaN(Number(arg))) {
      hours.push(Number(arg));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  });
  if (!isNaN(Number(startArgs[2]))) {
    return {
      target: Number(startArgs[2]),
      hours,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (
  target: number,
  hours: Array<number>
): ExerciseMetrics => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((val) => val !== 0).length;
  const average = hours.reduce((acc, cur) => acc + cur) / periodLength;
  const success = average > target;

  const rating = average > target ? 3 : average * 2 > target ? 2 : 1;
  let ratingDescription;
  switch (rating) {
    case 3:
      ratingDescription = "Great! Keep it up";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    default:
      ratingDescription = "Not Good. Improvement needed!";
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { target, hours } = parseArgument(process.argv);
  console.log(calculateExercises(target, hours));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
