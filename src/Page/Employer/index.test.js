import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Employer from ".";
import * as UserContext from "../../UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

jest.mock("../../UserContext", () => ({
  useUser: jest.fn(),
}));

const mockUser = { user: { type: "employer" } };

const mockFetchResponse = {
  ok: true,
  json: () =>
    Promise.resolve({
      total: 20,
      data: [
        {
          id: 1,
          title: "Test Job",
          description: "Test Description",
          tags: [],
          leadCount: [],
        },
      ],
    }),
};

describe("Jobs detail page", () => {
  beforeEach(() => {
    UserContext.useUser.mockReturnValue(mockUser);
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays jobs on mount", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <Employer />
        </Router>
      );
    });
    expect(await screen.findByText("Test Job")).toBeInTheDocument();
  });
});
