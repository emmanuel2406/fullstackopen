import express from "express";
import { Request, Response, NextFunction } from "express";
import * as z from "zod";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";
import { newEntrySchema } from "../utils";

const router: express.Router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(parseInt(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.status(404).send({ error: "Diary not found" });
  }
});

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

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

router.post(
  "/",
  newDiaryParser,
  // third generic type of Request is the body type
  (req: Request<unknown, unknown, NewDiaryEntry>, res: Response) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
