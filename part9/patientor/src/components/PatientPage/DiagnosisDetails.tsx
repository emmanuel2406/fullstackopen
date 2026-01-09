import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis } from "../../types";

const DiagnosisDetails = ({ code }: { code: string }) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  useEffect(() => {
    const fetchDiagnosis = async () => {
      const diagnosis = await diagnosisService.getByCode(code);
      setDiagnosis(diagnosis);
    };
    void fetchDiagnosis();
  }, [code]);
  if (!diagnosis) {
    return <div>Loading diagnosis...</div>;
  }
  return (
    <div>
      {diagnosis?.code} {diagnosis?.name}
    </div>
  );
};

export default DiagnosisDetails;
