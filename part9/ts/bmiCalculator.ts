const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi > 30) {
    return "Obese";
  } else if (bmi > 25) {
    return "Overweight";
  } else if (bmi > 18.5) {
    return "Normal (healthy weight)";
  }
  return "underweight";
};

console.log(calculateBmi(180, 74));
