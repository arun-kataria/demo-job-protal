import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterJobsDialog from "./FilterJobsDialog";

describe("FilterJobsDialog", () => {
  const mockHandleClose = jest.fn();
  const mockApplyFilters = jest.fn();

  beforeEach(() => {
    mockHandleClose.mockClear();
    mockApplyFilters.mockClear();
  });

  it("renders correctly when open", async () => {
    render(
      <FilterJobsDialog
        open={true}
        handleClose={mockHandleClose}
        applyFilters={mockApplyFilters}
      />
    );
    expect(screen.getByText("Filter Jobs")).toBeInTheDocument();
  });

  it("does not render when not open", () => {
    render(
      <FilterJobsDialog
        open={false}
        handleClose={mockHandleClose}
        applyFilters={mockApplyFilters}
      />
    );
    expect(screen.queryByText("Filter Jobs")).not.toBeInTheDocument();
  });

  it("allows user to input minimum and maximum salary", async () => {
    render(
      <FilterJobsDialog
        open={true}
        handleClose={mockHandleClose}
        applyFilters={mockApplyFilters}
      />
    );

    const minSalaryInput = screen.getByLabelText("Minimum Salary");
    const maxSalaryInput = screen.getByLabelText("Maximum Salary");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(minSalaryInput, "10");
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(maxSalaryInput, "100");
    });

    expect(minSalaryInput).toHaveValue(10);
    expect(maxSalaryInput).toHaveValue(100);
  });

  it("handles tag selection correctly", async () => {
    render(
      <FilterJobsDialog
        open={true}
        handleClose={mockHandleClose}
        applyFilters={mockApplyFilters}
      />
    );

    await act(async () => {
      await userEvent.click(screen.getByRole("combobox"));
    });
    await act(async () => {
      await userEvent.click(screen.getByText("javascript"));
      await userEvent.click(screen.getByText("HTML"));
    });

    const chipJavascript = screen.getByText("javascript");
    const dropdownOptions = await screen.findAllByRole("option", {
      name: "HTML",
    });
    expect(dropdownOptions).toHaveLength(1);

    expect(chipJavascript).toBeInTheDocument();
  });
});
