import { useState, useEffect } from "react";

import DiaryForm from "./components/DiaryForm";
import Error from "./components/Error";
import Entries from "./components/Entries";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { createEntry, getAllEntries } from "./services/diaryService";

const emptyEntry: NewDiaryEntry = {
  date: "",
  weather: "",
  visibility: "",
};

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>(emptyEntry);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  const notifyError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry(newEntry)
      .then((data) => {
        setEntries(entries.concat(data));
        setNewEntry(emptyEntry);
      })
      .catch((error: unknown) => {
        if (
          error &&
          typeof error === "object" &&
          "message" in error &&
          typeof error.message === "string"
        ) {
          notifyError(error.message);
        } else {
          notifyError("Unknown error occurred");
        }
      });
  };

  return (
    <div>
      <Error message={errorMessage} />
      <DiaryForm
        handleSubmit={addDiaryEntry}
        newEntry={newEntry}
        setNewEntry={setNewEntry}
      />
      <Entries entries={entries} />
    </div>
  );
};

export default App;
