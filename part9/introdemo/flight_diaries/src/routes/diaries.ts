import express from "express";
import { Response } from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";
import toNewDiaryEntry from "../utils";

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

router.post("/", (req, res) => {
  const newDiaryEntry = toNewDiaryEntry(req.body);

  const addedEntry = diaryService.addDiary(newDiaryEntry);
  res.json(addedEntry);
});

export default router;
