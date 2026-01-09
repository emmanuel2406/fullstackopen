import { Diagnosis } from "../types";
import diagnoses from "../../data/diagnoses";

const getAll = (): Diagnosis[] => {
  return diagnoses;
};

const getByCode = (code: Diagnosis["code"]): Diagnosis => {
  const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
  if (!diagnosis) {
    throw new Error(`Diagnosis with code ${code} not found`);
  }
  return diagnosis;
};

export default {
  getAll,
  getByCode,
};
