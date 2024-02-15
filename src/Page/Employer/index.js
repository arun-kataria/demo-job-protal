import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Paper,
  createTheme,
  ThemeProvider,
  styled,
  Button,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import JobCards from "../../Elements/jobCards";
import { URL, USER_TYPE } from "../../Config/constant";
import CreateJobDialog from "./createJobDialog";
import { useUser } from "../../UserContext";
import FilterJobsDialog from "../../Elements/FilterJobsDialog";
import FilterListIcon from "@mui/icons-material/FilterList";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });
const limit = 10;
export default function Employer() {
  const { user } = useUser();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [openCreateJobDialog, setOpenCreateJobDialog] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [filters, setFilters] = useState({
    minSalary: "",
    maxSalary: "",
    selectedTags: [],
  });

  const applyFilters = (filterValues) => {
    console.log("filterValues", filterValues);
    setFilters(filterValues);
    setJobsData([]);
    setSkip(0);
  };

  const fetchData = useCallback(async () => {
    try {
      const url = `${URL.GET_JOBS}?skip=${skip}&limit=${limit}&minSalary=${
        filters.minSalary
      }&maxSalary=${filters.maxSalary}&tags=${filters.selectedTags.join(",")}`;
      const jsonResponse = await fetch(url);
      const response = await jsonResponse.json();
      const totalJobs = response.total;
      const loadedJobs = response.data;

      setJobsData((prevJobsData) => [...prevJobsData, ...loadedJobs]);

      setHasMoreJobs(skip + limit >= totalJobs ? false : true);
    } catch (error) {
      console.log("error--", error);
    }
  }, [skip, filters]);

  const updateJobs = useCallback(
    (userId, itemId) => {
      setOpenSnackBar(true);

      let copy = JSON.parse(JSON.stringify(jobsData));
      copy = copy.map((item) => {
        if (item.id === itemId) {
          item.leadCount.push(userId);
        }
        return item;
      });
      setJobsData(copy);
    },
    [jobsData]
  );

  useEffect(() => {
    fetchData();
  }, [skip, fetchData]);

  const handleCreateJobDialog = useCallback(() => {
    setOpenCreateJobDialog(false);
    setJobsData([]);
    fetchData();
  }, [fetchData]);

  const loadMoreJobs = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        message="Job applied successfully "
        key="jobCardSnackBar"
      />
      <FilterJobsDialog
        open={openFilterDialog}
        handleClose={() => setOpenFilterDialog(false)}
        applyFilters={applyFilters}
      />
      <CreateJobDialog
        open={openCreateJobDialog}
        handleClose={handleCreateJobDialog}
      />
      <Box sx={{ pl: 3, pr: 3, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 2,
            pl: 2,
            pr: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            Jobs List
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={() => setOpenFilterDialog(true)}
              size="small"
            >
              Filter
            </Button>
            {user && user.type === USER_TYPE[0] ? (
              <Button
                variant="contained"
                onClick={() => setOpenCreateJobDialog(true)}
              >
                Create Job
              </Button>
            ) : null}
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: {
                  lg: "1fr 1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
              }}
            >
              {jobsData.map((item, index) => (
                <Item key={index} elevation={6}>
                  <JobCards item={item} updateJobs={updateJobs} />
                </Item>
              ))}

              {jobsData.length === 0 && !hasMoreJobs && (
                <Typography
                  sx={{ textAlign: "center", width: "100%" }}
                  variant="subtitle1"
                >
                  Data Not Found
                </Typography>
              )}
            </Box>
            {hasMoreJobs && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button onClick={loadMoreJobs} variant="outlined">
                  Load More
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
