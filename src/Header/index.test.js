import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./index";
import { UserProvider } from "../UserContext";
import * as UserContextModule from "../UserContext";

const renderHeaderWithState = () => {
  return render(
    <BrowserRouter>
      <UserProvider>
        <Header />
      </UserProvider>
    </BrowserRouter>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.mock("../UserContext", () => ({
      ...jest.requireActual("../../UserContext"),
      useUser: jest.fn().mockReturnValue({
        user: { userId: "2", type: "freelencer" },
      }),
    }));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders without crashing", () => {
    renderHeaderWithState(null);
    expect(screen.getByText(/logo/i)).toBeInTheDocument();
  });

  it("displays the logo", () => {
    renderHeaderWithState(null);
    expect(screen.getByText(/logo/i)).toBeInTheDocument();
  });

  it("shows avatar when user is logged in", () => {
    jest.spyOn(UserContextModule, "useUser").mockReturnValue({
      user: { userId: "2", type: "freelencer" },
    });
    render(
      <BrowserRouter>
        <UserProvider>
          <Header />
        </UserProvider>
      </BrowserRouter>
    );
    const avatar = screen.queryByTestId("avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("does not show avatar when user is not logged in", () => {
    jest.spyOn(UserContextModule, "useUser").mockReturnValue({
      user: null,
    });
    render(
      <BrowserRouter>
        <UserProvider>
          <Header />
        </UserProvider>
      </BrowserRouter>
    );
    expect(screen.queryByTestId("avatar")).not.toBeInTheDocument();
  });

  it("opens menu on avatar click when user is logged in", () => {
    jest.spyOn(UserContextModule, "useUser").mockReturnValue({
      user: { userId: "2", type: "freelencer" },
    });
    render(
      <BrowserRouter>
        <UserProvider>
          <Header />
        </UserProvider>
      </BrowserRouter>
    );
    fireEvent.click(screen.queryByTestId("avatar"));
    expect(screen.getByText(/my profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
  it("navigates to profile page on My Profile menu item click", () => {
    jest.spyOn(UserContextModule, "useUser").mockReturnValue({
      user: { userId: "2", type: "freelencer" },
      setUser: jest.fn(),
    });
    renderHeaderWithState();
    fireEvent.click(screen.queryByTestId("avatar"));
    fireEvent.click(screen.getByText(/my profile/i));
  });
  it("performs logout on Logout menu item click", () => {
    const setUserMock = jest.fn();
    jest.spyOn(UserContextModule, "useUser").mockReturnValue({
      user: { userId: "2", type: "freelencer" },
      setUser: setUserMock,
    });
    renderHeaderWithState();
    fireEvent.click(screen.queryByTestId("avatar"));
    fireEvent.click(screen.getByText(/logout/i));
    expect(setUserMock).toHaveBeenCalledWith(null);
  });
});
