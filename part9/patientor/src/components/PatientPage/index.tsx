import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import AddEntryModal from "./AddEntryModal";
import { NewEntry, Gender, Patient } from "../../types";
import EntryDetails from "./EntryDetails";

import patientService from "../../services/patients";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import OtherIcon from "@mui/icons-material/Transgender";

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    case "other":
      return <OtherIcon />;
    default:
      return null;
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const match = useMatch("/patients/:id");
  const id: string | undefined = match?.params.id;
  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  const submitNewEntry = (values: NewEntry) => {
    if (!patient || !patient.id) return;

    console.log("New entry values:", values);

    return patientService
      .createEntry(patient.id, values)
      .then((data) => {
        setPatient({ ...patient, entries: patient.entries?.concat(data) });
        closeModal();
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
          // Format Zod validation errors
          const zodErrors = error.response.data.error;
          if (Array.isArray(zodErrors)) {
            const errorMessages = zodErrors.map(
              (issue: { path: (string | number)[]; message: string }) => {
                const field = issue.path.join(".");
                return `${field}: ${issue.message}`;
              }
            );
            setError(errorMessages.join("\n"));
          } else {
            setError("Validation error");
          }
        } else if (axios.isAxiosError(error) && error.response?.data) {
          setError(error.response.data.message || error.message);
        } else {
          setError(error.message || "An error occurred");
        }
      });
  };

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div>
      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" color="primary" onClick={() => openModal()}>
        Add new entry
      </Button>
    </div>
  );
};

export default PatientPage;
