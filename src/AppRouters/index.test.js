// src/AppRoutes.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from ".";
// Import the module to mock it
import * as UserContext from "../UserContext";

// Mock the pages to simplify testing
jest.mock("../Page/Registration", () => () => <div>Registration Page</div>);
jest.mock("../Page/Employer", () => () => <div>Employer Page</div>);
jest.mock("../Page/FreelencerDetail", () => () => (
  <div>Freelancer Detail Page</div>
));
jest.mock("../Page/Login", () => () => <div>Login Page</div>);
jest.mock("../Page/Profile", () => () => <div>Profile Page</div>);

// Correct way to mock useUser hook
jest.mock("../UserContext", () => ({
  useUser: jest.fn(),
}));

// Helper function to render AppRoutes with a MemoryRouter
const renderWithRouter = (ui, { route = "/" } = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
  });
};

describe("AppRoutes", () => {
  it("navigates to Login page for unauthenticated user", () => {
    UserContext.useUser.mockReturnValue({ user: null });
    renderWithRouter(<AppRoutes />, { route: "/" });
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects authenticated user to Profile page from root", () => {
    UserContext.useUser.mockReturnValue({ user: { name: "John Doe" } });
    renderWithRouter(<AppRoutes />, { route: "/" });
    expect(screen.getByText("Profile Page")).toBeInTheDocument();
  });

  it("renders Registration page for any user", () => {
    UserContext.useUser.mockReturnValue({ user: null });
    renderWithRouter(<AppRoutes />, { route: "/registration" });
    expect(screen.getByText("Registration Page")).toBeInTheDocument();
  });
});
