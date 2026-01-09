import express from "express";
import { Request, Response, NextFunction } from "express";
import * as z from "zod";

import patientService from "../services/patientService";
import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  EntryWithoutId,
} from "../types";
import { newPatientSchema, newEntrySchema } from "../utils";

const router: express.Router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req: Request<{ id: string }>, res: Response<Patient>) => {
  const patient = patientService.getPatient(req.params.id);
  res.send(patient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response) => {
    const id: string = req.params.id;
    const entry: EntryWithoutId = req.body;
    const addedEntry = patientService.addEntry(id, entry);
    res.json(addedEntry);
  }
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
