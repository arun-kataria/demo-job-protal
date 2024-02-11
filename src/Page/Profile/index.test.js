import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfilePage from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Mock the useUser hook within UserContext
jest.mock("../../UserContext", () => ({
  useUser: jest.fn(),
}));

const mockSetUser = jest.fn();

const mockUser = {
  name: "John Doe",
  emailId: "john.doe@example.com",
  password: "password123",
  type: "employer",
};

describe("ProfilePage", () => {
  beforeEach(() => {
    require("../../UserContext").useUser.mockReturnValue({
      user: mockUser,
      setUser: mockSetUser,
    });
  });

  it("renders correctly", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <ProfilePage />
        </Router>
      );
    });

    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue(mockUser.name);
    expect(screen.getByLabelText("Email")).toHaveValue(mockUser.emailId);
    expect(screen.getByLabelText("Password")).toHaveValue(mockUser.password);
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("enables input fields for editing when edit button is clicked", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <ProfilePage />
        </Router>
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(screen.getByLabelText("Name")).not.toBeDisabled();
    expect(screen.getByLabelText("Email")).not.toBeDisabled();
    expect(screen.getByLabelText("Password")).not.toBeDisabled();
  });
});
