import { DiaryEntry } from "../types";
import Entry from "./Entry";

const Entries = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Entries;
