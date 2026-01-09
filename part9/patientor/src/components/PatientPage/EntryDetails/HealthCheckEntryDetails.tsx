import HealthCheckIcon from "@mui/icons-material/MonitorHeart";
import HeartIcon from "@mui/icons-material/Favorite";

import { HealthCheckRating, HealthCheckEntry } from "../../../types";
import DiagnosisDetails from "../DiagnosisDetails";
import { assertNever } from "../../../utils";

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <HeartIcon color="success" fontSize="small" />;
    case HealthCheckRating.LowRisk:
      return <HeartIcon color="warning" fontSize="small" />;
    case HealthCheckRating.HighRisk:
      return <HeartIcon color="error" fontSize="small" />;
    case HealthCheckRating.CriticalRisk:
      return <HeartIcon color="disabled" fontSize="small" />;
    default:
      return assertNever(rating);
  }
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      <p>
        {entry.date} <HealthCheckIcon fontSize="small" />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <HealthCheckRatingIcon rating={entry.healthCheckRating} />
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

export default HealthCheckEntryDetails;
