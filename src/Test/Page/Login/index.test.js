import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../../../Page/Login";
import * as UserContext from "../../../UserContext";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ROUTE, { USER_TYPE } from "../../../Config/constant";

// Mocks
jest.mock("../../../UserContext", () => ({
  useUser: jest.fn().mockReturnValue({
    setUser: jest.fn(),
  }),
}));
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (ui, { route = "/" } = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
  });
};

describe("LoginPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          data: { type: "employer", user: "arun", emailId: "arun@gmail.com" },
          message: "Logged in successfully",
        }),
    });
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));
    mockNavigate.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("navigates to Login page for unauthenticated user", () => {
    UserContext.useUser.mockReturnValue({ user: null });
    renderWithRouter(<LoginPage />, { route: "/" });
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("submits login form and handles successful login", async () => {
    const setUserMock = jest.fn();
    UserContext.useUser.mockReturnValue({ setUser: setUserMock });
    renderWithRouter(<LoginPage />, { route: "/login" });

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });

    // Mock fetch response before form submission
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: { type: USER_TYPE[0] }, // Assuming USER_TYPE[0] is 'employer'
          message: "Logged in successfully",
        }),
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Sign In/i }));

    // Check if setIsLoader was called with true then false
    await waitFor(() =>
      expect(setUserMock).toHaveBeenCalledWith({
        type: USER_TYPE[0],
      })
    );

    // Verify setUser was called with the correct data
    expect(UserContext.useUser().setUser).toHaveBeenCalledWith({
      type: USER_TYPE[0], // Replace with the expected user type
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.EMPLOYER);
    });
  });
  it("submits login form and handles successful login for freelencer", async () => {
    const setUserMock = jest.fn();
    UserContext.useUser.mockReturnValue({ setUser: setUserMock });
    renderWithRouter(<LoginPage />, { route: "/login" });

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: { type: USER_TYPE[1] },
          message: "Logged in successfully",
        }),
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() =>
      expect(setUserMock).toHaveBeenCalledWith({
        type: USER_TYPE[1],
      })
    );

    expect(UserContext.useUser().setUser).toHaveBeenCalledWith({
      type: USER_TYPE[1],
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.FREELENCER);
    });
  });
});
