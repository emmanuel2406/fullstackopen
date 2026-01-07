import express from "express";
require("dotenv").config();
import cors from "cors";
import diagnoses from "../data/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnoses);
});

app.use("/api/patients", patientRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
