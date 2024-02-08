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
import { Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      },
    },
  },
});

const RepositoryCard = ({ repo }) => {
  return (
    <Card
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        height: "100%",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          <Link href={repo.item.link} color="inherit" underline="hover">
            {repo.item.name}
          </Link>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            mb: 2,
          }}
        >
          {repo.item.description}
        </Typography>
        {/* Chips */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            icon={<CircleIcon style={{ color: repo.item.languageColor }} />}
            label={repo.item.language}
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<StarBorderIcon />}
            label={`${repo.item.stargazers_count}k`}
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<ForkRightIcon />}
            label={`${repo.item.forks_count}k`}
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default function GithubCard(item) {
  return (
    <ThemeProvider theme={darkTheme}>
      <RepositoryCard repo={item} />
    </ThemeProvider>
  );
}
