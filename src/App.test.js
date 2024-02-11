// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { UserProvider, useUser } from "./UserContext";
// Mock the Header and AppRoutes components
jest.mock("./Header", () => () => (
  <div>
    <a href="/mocked-path">Mocked Header</a>
  </div>
));
jest.mock("./AppRouters", () => () => <div>Mocked AppRoutes</div>);
const MockUserConsumer = () => {
  const { user } = useUser();
  return <div>Current User: {user ? user.name : "No User"}</div>;
};

describe("App component", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });
  it("renders the App component with a Header and AppRoutes", () => {
    render(<App />);
    // Check if the "Mocked Header" text is in the document
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    // Check if the "Mocked AppRoutes" text is in the document
    expect(screen.getByText("Mocked AppRoutes")).toBeInTheDocument();
  });
  it("renders and provides context and routing", () => {
    // Directly render App, assuming it wraps its children with BrowserRouter and UserProvider
    render(<App />);

    // Example: Test navigation (BrowserRouter effect)
    // This requires your app to use react-router's Link component or similar navigational components
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("Mocked Header").closest("a")).toHaveAttribute(
      "href",
      "/mocked-path"
    );

    // For UserProvider, you would ideally test if a child component receives context values.
    // This often requires a mock component that consumes the context to verify its presence.
  });
  it("initializes user from localStorage if present", () => {
    // Setup a mock user value and save it to localStorage
    const mockUser = { name: "John Doe" };
    localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <UserProvider>
        <MockUserConsumer />
      </UserProvider>
    );
    expect(screen.getByText(/^Current User:/).textContent).toEqual(
      "Current User: John Doe"
    );
  });

  it("provides no user context if localStorage is empty", () => {
    render(
      <UserProvider>
        <MockUserConsumer />
      </UserProvider>
    );
    expect(screen.getByText(/^Current User:/).textContent).toEqual(
      "Current User: No User"
    );
  });
});
