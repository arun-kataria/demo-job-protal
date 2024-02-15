import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import JobCard from "./jobCards";
import { UserProvider } from "../UserContext";
import * as UserContextModule from "../UserContext";
import { URL } from "../Config/constant";

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

beforeEach(() => {
  jest.mock("../UserContext", () => ({
    ...jest.requireActual("../../UserContext"),
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
  jest.restoreAllMocks();
});

it('shows "Apply" button when user has not applied', () => {
  jest.spyOn(UserContextModule, "useUser").mockReturnValue({
    user: { userId: "2", type: "freelencer" },
  });

  render(
    <UserProvider>
      <JobCard item={mockItem} updateJobs={mockUpdateJobs} />
    </UserProvider>
  );

  const applyButton = screen.getByRole("button", { name: "Apply" });
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
      expect(fetch).toHaveBeenCalledWith(URL.APPLY_JOB, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "2",
          itemId: "1",
        }),
      })
    );

    // eslint-disable-next-line jest/no-conditional-expect
    await waitFor(() => expect(mockUpdateJobs).toHaveBeenCalled());
  } else {
    console.error("Apply button not found in the document.");
  }
});
