import React from "react";
import { render, screen } from "@testing-library/react";
import GithubCard from "./GithubCard";

describe("GithubCard", () => {
  const mockRepo = {
    item: {
      link: "https://github.com/sample/repo",
      name: "sample/repo",
      description: "This is a sample repository",
      language: "JavaScript",
      languageColor: "#f1e05a",
      stargazers_count: 1.2,
      forks_count: 0.8,
    },
  };

  it("renders repository information correctly", () => {
    render(<GithubCard {...mockRepo} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", mockRepo.item.link);
    expect(linkElement).toHaveTextContent(mockRepo.item.name);

    const descriptionElement = screen.getByText(mockRepo.item.description);
    expect(descriptionElement).toBeInTheDocument();

    const languageChip = screen.getByText(mockRepo.item.language);
    expect(languageChip).toBeInTheDocument();

    const starsChip = screen.getByText(`${mockRepo.item.stargazers_count}k`);
    expect(starsChip).toBeInTheDocument();

    const forksChip = screen.getByText(`${mockRepo.item.forks_count}k`);
    expect(forksChip).toBeInTheDocument();
  });
});
