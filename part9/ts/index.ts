import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      weight,
      height,
      bmi,
    });
  } else {
    res.status(400).send({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, exerciseHours } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (exerciseHours.length < 1 || !target) {
    return res.status(400).send({
      error: "parameters missing",
    });
  }
  if (!isNaN(Number(target))) {
    return res.send(calculateExercises(Number(target), exerciseHours));
  } else {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
