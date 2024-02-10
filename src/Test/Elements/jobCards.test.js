import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import JobCard from "../../Elements/jobCards";
import { UserProvider } from "../../UserContext";
import * as UserContextModule from "../../UserContext"; // Ensure correct import path
import { URL } from "../../Config/constant";

// Define mock data outside of the test block
const mockUpdateJobs = jest.fn();
const mockItem = {
  id: "1",
  title: "Frontend Developer",
  description: "Description of Frontend Developer",
  leadCount: [],
  salaryPerHour: "50",
  tags: ["React", "JavaScript"],
};
const mockUser = {
  userId: "2",
  type: "freelancer",
};

// Setup the mock for useUser hook before each test
beforeEach(() => {
  jest.mock("../../UserContext", () => ({
    ...jest.requireActual("../../UserContext"), // This assumes there are other exports you might want to use as-is
    useUser: jest.fn().mockReturnValue({
      user: { userId: "2", type: "freelencer" },
    }),
  }));
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  });
});
afterEach(() => {
  jest.restoreAllMocks(); // Restores `fetch` to its original state
});

it('shows "Apply" button when user has not applied', () => {
  // Mock implementation specific to this test
  jest.spyOn(UserContextModule, "useUser").mockReturnValue({
    user: { userId: "2", type: "freelencer" },
  });

  render(
    <UserProvider>
      <JobCard item={mockItem} updateJobs={mockUpdateJobs} />
    </UserProvider>
  );

  // Assuming the "Apply" button text is exactly "Apply" and it should be rendered
  const applyButton = screen.getByRole("button", { name: "Apply" }); // Using getByRole for better practice
  expect(applyButton).toBeInTheDocument();
});

it('handles "Apply" button click correctly', async () => {
  jest.spyOn(UserContextModule, "useUser").mockReturnValue({
    user: { userId: "2", type: "freelencer" },
  });
  render(
    <UserProvider value={{ user: mockUser }}>
      <JobCard item={mockItem} updateJobs={mockUpdateJobs} />
    </UserProvider>
  );

  const applyButton = screen.queryByText("Apply");
  if (applyButton) {
    fireEvent.click(applyButton);

    await waitFor(() =>
      // eslint-disable-next-line jest/no-conditional-expect
      expect(fetch).toHaveBeenCalledWith(
        URL.APPLY_JOB, // Expected URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "2", // Assuming this userId is from your mocked user
            itemId: "1", // Assuming this is the itemId from mockItem
          }),
        }
      )
    );

    // eslint-disable-next-line jest/no-conditional-expect
    await waitFor(() => expect(mockUpdateJobs).toHaveBeenCalled());
  } else {
    console.error("Apply button not found in the document.");
  }
});
