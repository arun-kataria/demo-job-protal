import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  Input,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";

export default function JobForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [document, setDocument] = useState(null);

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleFileChange = (event) => {
    setDocument(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare form data to be submitted
    const formData = {
      companyName,
      contactInfo,
      jobDescription,
      jobRequirements,
      tags,
      document,
    };
    console.log(formData);
    // Submit formData here
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h6" gutterBottom>
        Job Posting Form
      </Typography>
      <TextField
        label="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Info"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Job Description (max 16KB)"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 16000 }}
        multiline
      />
      <TextField
        label="Job Requirements"
        value={jobRequirements}
        onChange={(e) => setJobRequirements(e.target.value)}
        fullWidth
        margin="normal"
        multiline
      />
      <FormControl fullWidth margin="normal">
        <Input
          type="file"
          onChange={handleFileChange}
          inputProps={{
            accept:
              ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          }}
        />
      </FormControl>
      <TextField
        label="Add Tag"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddTag} sx={{ my: 2 }}>
        Add Tag
      </Button>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        {tags.map((tag, index) => (
          <Grid item key={index}>
            <Chip label={tag} onDelete={handleDeleteTag(tag)} />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
