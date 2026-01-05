import express from "express";
const app = express();
import calculateBmi from "./bmiCalculator";

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
