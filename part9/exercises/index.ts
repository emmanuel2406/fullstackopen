import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

interface BmiResponse {
  weight: number;
  height: number;
  bmi: string;
}

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({ error: "Malformatted parameters" });
    return;
  }
  const bmi: string = calculateBmi(Number(height), Number(weight));
  const response: BmiResponse = {
    weight: Number(weight),
    height: Number(height),
    bmi,
  };
  res.send(response);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  const result = calculateExercises(
    daily_exercises as number[],
    Number(target)
  );
  return res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
