import express from "express";
import { Request, Response } from "express";
import { Diagnosis } from "../types";
import diagnosisService from "../services/diagnosisService";

const router: express.Router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getAll());
});

router.get(
  "/:code",
  (req: Request<{ code: Diagnosis["code"] }>, res: Response<Diagnosis>) => {
    const diagnosis = diagnosisService.getByCode(req.params.code);
    res.send(diagnosis);
  }
);

export default router;
