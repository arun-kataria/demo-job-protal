import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Registration from "./index";
import { BrowserRouter } from "react-router-dom";

const renderRegistration = () =>
  render(
    <BrowserRouter>
      <Registration />
    </BrowserRouter>
  );

describe("Registration Component", () => {
  it("renders correctly", () => {
    const { getByText } = renderRegistration();
    expect(getByText(/Employer/i)).toBeInTheDocument();
    expect(getByText(/FreeLancer/i)).toBeInTheDocument();
  });

  it("switches tabs correctly", () => {
    const { getByText, getAllByRole } = renderRegistration();
    fireEvent.click(getByText(/FreeLancer/i));
    expect(getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");
  });

  it("validates form fields before allowing submission", async () => {
    renderRegistration();
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/EmailId/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.blur(screen.getByLabelText(/EmailId/i));

    await waitFor(() =>
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument()
    );
    expect(submitButton).toBeDisabled();
  });
});
