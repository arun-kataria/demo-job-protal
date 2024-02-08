import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import JobCard from "../../Elements/jobCards";
import { URL } from "../../Config/constant";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function Employer() {
  const [jobsData, setJobsData] = React.useState([]);
  const fetchData = async () => {
    try {
      const jsonResponse = await fetch(URL.GET_JOBS.replace(":id", 1));
      const response = await jsonResponse.json();
      setJobsData(response.data);
    } catch (error) {
      console.log("error--", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ pl: 3, pr: 3 }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ p: 2, textAlign: "center" }}
        >
          Jobs List
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: {
                  lg: "1fr 1fr 1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
              }}
            >
              {jobsData.map((item) => (
                <Item key={item.id} elevation={6}>
                  <JobCard item={item} />
                </Item>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
