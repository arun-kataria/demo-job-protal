import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FeelencerDetail from ".";
import * as UserContext from "../../UserContext";
import { act } from "react-dom/test-utils";

describe("FeelencerDetail", () => {
  const mockUser = {
    gitUserName: "test-user",
  };

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: "Repo 1" }]),
      })
    );
    jest.spyOn(UserContext, "useUser").mockReturnValue({ user: mockUser });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders user information correctly", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <BrowserRouter>
          <FeelencerDetail />
        </BrowserRouter>
      );
    });

    expect(screen.getByText("Apply on jobs")).toBeInTheDocument();
    expect(screen.getByText("Arun Kataria")).toBeInTheDocument();

    await act(async () => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.github.com/users/test-user/repos"
      );
      expect(screen.getByText("Repo 1")).toBeInTheDocument();
    });
  });

  it("expands additional information on click", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <BrowserRouter>
          <FeelencerDetail />
        </BrowserRouter>
      );
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByLabelText("show more"));
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText("About:")).toBeVisible();
      });
    });
  });
});
