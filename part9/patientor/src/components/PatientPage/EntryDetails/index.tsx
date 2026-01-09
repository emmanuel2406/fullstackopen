import { Entry } from "../../../types";
import HospitalEntryDetails from "./HospitalEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
import Box from "@mui/material/Box";

import { assertNever } from "../../../utils";

const EntryRoutedDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
  }
  return assertNever(entry);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  return (
    <Box sx={{ border: "1px solid #0000001f", padding: 2, marginBottom: 2 }}>
      <EntryRoutedDetails entry={entry} />
    </Box>
  );
};

export default EntryDetails;
