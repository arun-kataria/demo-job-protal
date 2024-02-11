import React from "react";
import { render, screen } from "@testing-library/react";
import CircularProgressBar from "./CircularProgressBar";

describe("CircularProgressBar", () => {
  it("renders a CircularProgress component", () => {
    render(<CircularProgressBar />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
  });
});
