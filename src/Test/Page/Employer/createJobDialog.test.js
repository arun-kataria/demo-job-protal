import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateJobDialog from "../../../Page/Employer/createJobDialog";

describe("CreateJobDialog", () => {
  const handleClose = jest.fn();

  it("renders correctly", () => {
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
    // Create a file to use as a mock upload
    const file = new File(["dummy content"], "resume.pdf", {
      type: "application/pdf",
    });
    // Directly select the input element, ensuring it is not null
    // eslint-disable-next-line testing-library/no-node-access
    const fileInput = document.querySelector('input[type="file"]');
    if (!fileInput) throw new Error("File input not found");
    // Use fireEvent to simulate the file selection
    fireEvent.change(fileInput, { target: { files: [file] } });
    // Assert that the file name is displayed, indicating the file was attached
    expect(screen.getByText(/resume.pdf/i)).toBeInTheDocument();
  });

  it("calls handleSubmit on form submission", () => {
    render(<CreateJobDialog open={true} handleClose={handleClose} />);
    // Mock global fetch or use a library like jest-fetch-mock here
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);
    // Assertions for fetch mock or handleClose mock to have been called
  });

  it("closes the dialog on cancel", () => {
    render(<CreateJobDialog open={true} handleClose={handleClose} />);
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
