import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Todo } from "./List";

describe("Todo", () => {
  it("renders the todo text", () => {
    render(<Todo todo={{ text: "Buy milk", done: false }} />);

    expect(screen.getByText("Buy milk")).toBeTruthy();
  });
});
