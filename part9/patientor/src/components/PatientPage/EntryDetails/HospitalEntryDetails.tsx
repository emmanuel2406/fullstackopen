import HospitalIcon from "@mui/icons-material/Bloodtype";

import { HospitalEntry } from "../../../types";
import DiagnosisDetails from "../DiagnosisDetails";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <p>
        {entry.date} <HospitalIcon fontSize="small" />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>
        Discharged on {entry.discharge.date} with criteria:{" "}
        <i>{entry.discharge.criteria}</i>
      </p>
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

export default HospitalEntryDetails;
