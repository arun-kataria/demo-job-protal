import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import CircleIcon from "@mui/icons-material/Circle";
import Link from "@mui/material/Link";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const RepositoryCard = ({ repo }) => {
  return (
    <Card sx={{ backgroundColor: "background.default", color: "text.primary" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Link href={repo.link} color="inherit" underline="hover">
            {repo.name}
          </Link>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {repo.description}
        </Typography>
        <Chip
          icon={<CircleIcon style={{ color: repo.languageColor }} />}
          label={repo.language}
          variant="outlined"
          size="small"
        />
        <Chip
          icon={<StarBorderIcon />}
          label={`${repo.stars}k`}
          variant="outlined"
          size="small"
          sx={{ ml: 1 }}
        />
        <Chip
          icon={<ForkRightIcon />}
          label={`${repo.forks}k`}
          variant="outlined"
          size="small"
          sx={{ ml: 1 }}
        />
      </CardContent>
    </Card>
  );
};

// Example usage:
const repoData = {
  name: "Insurance repo",
  description: "Easy to maintain open source documentation websites.",
  language: "TypeScript",
  languageColor: "#3178c6", // Color value for TypeScript as an example
  stars: "51.2",
  forks: "7.9",
  link: "https://github.com/facebook/docusaurus",
};

export default function GithubCard() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RepositoryCard repo={repoData} />
    </ThemeProvider>
  );
}
