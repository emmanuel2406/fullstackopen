import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const createEntry = async (entry: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, entry);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data?.error;
      if (Array.isArray(errorData)) {
        // Handle ZodError issues array
        const messages = errorData.map(
          (issue: { message?: string; path?: (string | number)[] }) => {
            const path = issue.path?.join(".") || "field";
            return `${path}: ${issue.message || "Invalid value"}`;
          }
        );
        throw new Error(messages.join(", "));
      } else if (typeof errorData === "string") {
        throw new Error(errorData);
      }
    }
    throw new Error("Error creating entry");
  }
};
