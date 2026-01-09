import { Gender, Patient } from "../../types";
import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";

import patientService from "../../services/patients";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    case "other":
      return <TransgenderIcon />;
    default:
      return null;
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

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
    </div>
  );
};

export default PatientPage;
