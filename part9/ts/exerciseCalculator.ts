interface exerciseMetrics {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (
  hours: Array<number>,
  target: number
): exerciseMetrics => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
