import { DiaryEntry } from "../types";

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h2>{entry.date}</h2>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
    </div>
  );
};

export default Entry;
