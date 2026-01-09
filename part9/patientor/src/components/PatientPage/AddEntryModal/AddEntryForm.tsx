import { useState, useEffect } from "react";

import { Box, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Diagnosis, NewEntry } from "../../../types";
import diagnosisService from "../../../services/diagnoses";

import HealthCheckEntryForm from "./HealthCheckEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [entryTab, setEntryTab] = useState<string>("healthCheck");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnosisCodes(
        diagnoses.map((diagnosis: Diagnosis) => diagnosis.code)
      );
    };
    void fetchDiagnosisCodes();
  }, []);

  return (
    <div>
      <TabContext value={entryTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(_, newValue) => setEntryTab(newValue)}
            aria-label="Entry type"
          >
            <Tab label="Health Check" value="healthCheck" />
            <Tab
              label="Occupational Healthcare"
              value="occupationalHealthcare"
            />
            <Tab label="Hospital" value="hospital" />
          </TabList>
        </Box>
        <TabPanel value="healthCheck">
          <HealthCheckEntryForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            diagnosisCodes={diagnosisCodes}
          />
        </TabPanel>
        <TabPanel value="occupationalHealthcare">
          <OccupationalHealthcareEntryForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            diagnosisCodes={diagnosisCodes}
          />
        </TabPanel>
        <TabPanel value="hospital">
          <HospitalEntryForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            diagnosisCodes={diagnosisCodes}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default AddEntryForm;
