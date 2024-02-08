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

export default function JobCard({ item }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
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
              <Badge badgeContent={item.leadCount} color="primary">
                <FaceIcon color="action" />
              </Badge>
            </Box>
            <Typography color="text.secondary">{item.description}</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              {item.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" />
              ))}
            </Stack>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setOpen(true)}>
              View Details
            </Button>
          </CardActions>
          <JobDetilDialog open={open} handleClose={handleClose} item={item} />
        </React.Fragment>
      </Card>
    </Box>
  );
}
