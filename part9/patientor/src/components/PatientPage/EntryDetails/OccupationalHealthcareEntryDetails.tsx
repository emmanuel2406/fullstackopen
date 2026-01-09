import OccupationalHealthcareIcon from "@mui/icons-material/Work";

import { OccupationalHealthcareEntry } from "../../../types";
import DiagnosisDetails from "../DiagnosisDetails";

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <p>
        {entry.date} <OccupationalHealthcareIcon fontSize="small" />{" "}
        {entry.employerName}
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.sickLeave && (
        <p>
          Sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </p>
      )}
      <p>diagnose by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            <DiagnosisDetails code={code} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
