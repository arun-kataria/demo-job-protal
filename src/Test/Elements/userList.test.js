import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserList from "../../Elements/userList";

describe("UserList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.open = jest.fn();
  });

  afterAll(() => {
    global.open.mockRestore();
  });

  it("renders a list of users", () => {
    render(<UserList />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(10);
    listItems.forEach((item, index) => {
      expect(
        within(item).getByText(`Arun Kataria ${index + 1}`)
      ).toBeInTheDocument();
      expect(
        within(item).getByRole("img", { name: /arun/i })
      ).toBeInTheDocument();
    });
  });

  it("renders ratings correctly", () => {
    render(<UserList />);
    const ratings = screen.getAllByRole("img", { name: /Stars?/ });

    ratings.forEach((rating, index) => {
      const expectedRating =
        index === 0 ? "0 Stars" : `${index} Star${index > 1 ? "s" : ""}`;
      expect(rating).toHaveAttribute("aria-label", expectedRating);
    });
  });

  it("links to user details correctly", () => {
    render(<UserList />);
    const listItems = screen.getAllByRole("listitem");
    listItems.forEach((item, index) => {
      userEvent.click(item);
      expect(global.open).toHaveBeenCalledWith(
        expect.stringContaining(String(index + 1)),
        "_blank"
      );
    });
  });
});
