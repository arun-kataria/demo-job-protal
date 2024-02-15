import { render, screen, fireEvent } from "@testing-library/react";
import JobDetailDialog from "./jobDetialDialog";

const mockHandleClose = jest.fn();

const mockItem = {
  title: "Job Title",
  description: "Job Description",
  tags: ["Tag1", "Tag2"],
};

describe("JobDetailDialog", () => {
  it("should not be visible when open is false", () => {
    render(
      <JobDetailDialog
        open={false}
        item={mockItem}
        handleClose={mockHandleClose}
      />
    );
    expect(screen.queryByText(mockItem.title)).not.toBeInTheDocument();
  });

  it("displays item details correctly", () => {
    render(
      <JobDetailDialog
        open={true}
        item={mockItem}
        handleClose={mockHandleClose}
      />
    );
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
    mockItem.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("displays content on open", async () => {
    render(
      <JobDetailDialog
        open={true}
        item={mockItem}
        handleClose={mockHandleClose}
      />
    );

    expect(screen.getByText(mockItem.title)).toBeVisible();

    expect(screen.getByText(mockItem.description)).toBeVisible();
    mockItem.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeVisible();
    });
  });

  it("closes when the Close button is clicked", () => {
    render(
      <JobDetailDialog
        open={true}
        item={mockItem}
        handleClose={mockHandleClose}
      />
    );
    fireEvent.click(screen.getByText("Close"));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
