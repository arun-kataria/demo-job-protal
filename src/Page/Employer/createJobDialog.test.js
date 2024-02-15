import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateJobDialog from "./createJobDialog";

describe("CreateJobDialog", () => {
  const handleClose = jest.fn();

  it("renders correctly data", () => {
    render(<CreateJobDialog open={true} handleClose={handleClose} />);
    expect(screen.getByText(/Create Job Posting/i)).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    render(<CreateJobDialog open={true} handleClose={handleClose} />);
    const jobTitleInput = screen.getByLabelText(/Job Title/i);
    fireEvent.change(jobTitleInput, { target: { value: "Test Job Title" } });
    expect(jobTitleInput).toHaveValue("Test Job Title");
  });

  it("adds tags correctly", () => {
    render(<CreateJobDialog open={true} handleClose={handleClose} />);
    const tagInput = screen.getByPlaceholderText(/Add tags/i);
    fireEvent.change(tagInput, { target: { value: "React" } });
    fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("attaches a file correctly", () => {
    render(<CreateJobDialog open={true} handleClose={handleClose} />);
    const file = new File(["dummy content"], "resume.pdf", {
      type: "application/pdf",
    });
    // eslint-disable-next-line testing-library/no-node-access
    const fileInput = document.querySelector('input[type="file"]');
    if (!fileInput) throw new Error("File input not found");
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.getByText(/resume.pdf/i)).toBeInTheDocument();
  });

  it("calls handleSubmit on form submission", () => {
    render(<CreateJobDialog open={true} handleClose={handleClose} />);
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);
  });

  it("closes the dialog on cancel", () => {
    render(<CreateJobDialog open={true} handleClose={handleClose} />);
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
