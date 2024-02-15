import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const allTags = ["java", "javascript", "HTML", "CSS"];

function FilterJobsDialog({ open, handleClose, applyFilters }) {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
  };

  const handleMaxSalaryChange = (event) => {
    setMaxSalary(event.target.value);
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === "string" ? value.split(",") : value);
  };

  const handleResetFilters = () => {
    setMinSalary("");
    setMaxSalary("");
    setSelectedTags([]);

    applyFilters({
      minSalary: "",
      maxSalary: "",
      selectedTags: [],
    });

    handleClose();
  };

  const handleApplyFilters = () => {
    applyFilters({
      minSalary,
      maxSalary,
      selectedTags,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Filter Jobs</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Minimum Salary"
          type="number"
          fullWidth
          variant="outlined"
          value={minSalary}
          onChange={handleMinSalaryChange}
        />
        <TextField
          margin="dense"
          label="Maximum Salary"
          type="number"
          fullWidth
          variant="outlined"
          value={maxSalary}
          onChange={handleMaxSalaryChange}
        />
        <FormControl fullWidth>
          <InputLabel>Tags</InputLabel>
          <Select
            data-testid="tags-select"
            multiple
            value={selectedTags}
            onChange={handleTagChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {allTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
        <Button onClick={handleResetFilters} color="secondary">
          Reset Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterJobsDialog;
