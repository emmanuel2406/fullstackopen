import { v1 as uuid } from "uuid";
import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  Entry,
  EntryWithoutId,
} from "../types";
import patients from "../../data/patients";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = getPatient(id);
  const newEntry: Entry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry,
};
