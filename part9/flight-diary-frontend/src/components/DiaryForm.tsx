import { NewDiaryEntry } from "../types";

const weatherOptions = [
  { label: "Sunny", value: "sunny" },
  { label: "Rainy", value: "rainy" },
  { label: "Cloudy", value: "cloudy" },
  { label: "Windy", value: "windy" },
  { label: "Stormy", value: "stormy" },
];

const visibilityOptions = [
  { label: "Great", value: "great" },
  { label: "Good", value: "good" },
  { label: "Ok", value: "ok" },
  { label: "Poor", value: "poor" },
];

const DiaryForm = ({
  handleSubmit,
  newEntry,
  setNewEntry,
}: {
  handleSubmit: (event: React.SyntheticEvent) => void;
  newEntry: NewDiaryEntry;
  setNewEntry: (entry: NewDiaryEntry) => void;
}) => {
  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          />
        </div>
        <div>
          <label>Weather</label>
          {weatherOptions.map((option) => (
            <div key={option.value}>
              <input
                type="radio"
                value={option.value}
                checked={newEntry.weather === option.value}
                onChange={() =>
                  setNewEntry({ ...newEntry, weather: option.value })
                }
              />
              {option.label}
            </div>
          ))}
        </div>
        <div>
          <label>Visibility</label>
          {visibilityOptions.map((option) => (
            <div key={option.value}>
              <input
                type="radio"
                value={option.value}
                checked={newEntry.visibility === option.value}
                onChange={() =>
                  setNewEntry({ ...newEntry, visibility: option.value })
                }
              />
              {option.label}
            </div>
          ))}
        </div>
        <div>
          <label>Comment</label>
          <input
            type="text"
            value={newEntry.comment}
            onChange={(e) =>
              setNewEntry({ ...newEntry, comment: e.target.value })
            }
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
