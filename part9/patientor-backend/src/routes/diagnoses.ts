import express from "express";
import { Response } from "express";
import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

const router: express.Router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoses);
});

export default router;
