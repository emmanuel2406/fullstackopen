import { SyntheticEvent, useState } from "react";

import {
  Input,
  TextField,
  Box,
  Select,
  MenuItem,
  Button,
  Grid,
  SelectChangeEvent,
  Chip,
} from "@mui/material";
import { Diagnosis, EntryFormProps } from "../../../types";

const HospitalEntryForm = ({
  onCancel,
  onSubmit,
  diagnosisCodes,
}: EntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    Diagnosis["code"][]
  >([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "Hospital",
      description,
      date,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
      diagnosisCodes: selectedDiagnosisCodes,
    });
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value: string | string[] = event.target.value;
    setSelectedDiagnosisCodes(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <Input
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ my: 2 }} />
        <TextField
          label="Specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <Box sx={{ my: 2 }} />
        <p>Discharge Date</p>
        <Input
          type="date"
          fullWidth
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
        />
        <Box sx={{ my: 2 }} />
        <TextField
          label="Discharge Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={(e) => setDischargeCriteria(e.target.value)}
        />
        <Box sx={{ my: 2 }} />
        <p>Diagnosis Codes</p>
        <Select
          multiple
          fullWidth
          value={selectedDiagnosisCodes}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          onChange={handleDiagnosisCodesChange}
        >
          {diagnosisCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ my: 2 }} />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HospitalEntryForm;
