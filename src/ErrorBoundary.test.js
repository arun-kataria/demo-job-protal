import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBoundary from "./ErrorBoundary";

const ProblematicComponent = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>Normal rendering</div>;
};

describe("ErrorBoundary", () => {
  it("renders its children without errors", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Normal rendering")).toBeInTheDocument();
  });

  it("displays an error message when a child component throws an error", () => {
    const error = console.error;
    console.error = jest.fn();

    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Oops, something went wrong.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reload" })).toBeInTheDocument();

    console.error = error;
  });

  it("reloads the page when the reload button is clicked", () => {
    delete window.location;
    window.location = { href: "" };

    const error = console.error;
    console.error = jest.fn();

    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole("button", { name: "Reload" }));
    expect(window.location.href).toBe("/");

    window.location = location;
    console.error = error;
  });
});
