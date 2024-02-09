import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Badge,
  Chip,
  Stack,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import JobDetilDialog from "./jobDetialDialog";
import { useUser } from "../UserContext";
import { URL, USER_TYPE } from "../Config/constant";

export default function JobCard({ item, updateJobs }) {
  const { user } = useUser();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const jobApplyHandler = async () => {
    const userId = user.userId;
    const itemId = item.id;
    const response = await fetch(URL.APPLY_JOB, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, itemId }), // Convert the object to JSON string
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    ///console.log("success: ", result);
    updateJobs();
  };

  const applyButton = () => {
    if (user && user.type === USER_TYPE[1]) {
      if (item.leadCount.includes(user.userId)) {
        return (
          <Button size="small" variant="contained" color="success" disabled>
            Already Applied
          </Button>
        );
      } else {
        return (
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={jobApplyHandler}
          >
            Apply
          </Button>
        );
      }
    } else {
      return null;
    }
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ fontSize: 16, fontWeight: 800 }}
                variant="h5"
                component="div"
              >
                {item.title}
              </Typography>
              <Badge
                badgeContent={item.leadCount && item.leadCount.length}
                color="primary"
              >
                <FaceIcon color="action" />
              </Badge>
            </Box>
            <Typography color="text.secondary">{item.description}</Typography>
            {item.salaryPerHour ? (
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Salary per/hour: {item.salaryPerHour}
              </Typography>
            ) : null}
            <Stack direction="row" spacing={1}>
              {item.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" />
              ))}
            </Stack>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              View Details
            </Button>
            {applyButton()}
          </CardActions>
          <JobDetilDialog open={open} handleClose={handleClose} item={item} />
        </React.Fragment>
      </Card>
    </Box>
  );
}
