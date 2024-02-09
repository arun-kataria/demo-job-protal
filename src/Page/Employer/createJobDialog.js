import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { URL } from "../../Config/constant";

const CreateJobDialog = ({ open, handleClose }) => {
  const [newTag, setNewTag] = useState("");
  const [formData, setFormData] = useState({
    jobDescription: "",
    jobTitle: "",
    tags: [],
    companyName: "",
    contactInfo: "",
    document: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleTagAdd = (tag) => {
    if (newTag) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
      setNewTag("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const handleSubmit = async () => {
    let documentId = null;
    if (formData.document) {
      documentId = Date.now().toString();
      localStorage.setItem(documentId, formData.document);
    }

    const dataToSend = {
      title: formData.jobTitle,
      description: formData.jobDescription,
      contactInfo: formData.contactInfo,
      tags: formData.tags,
      documentId: documentId,
    };

    try {
      const response = await fetch(URL.CREATE_JOB, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Convert the object to JSON string
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result); // Handle success
      handleClose(); // Close dialog on success
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Job Posting</DialogTitle>
      <DialogContent>
        <TextField
          label="Job Title"
          name="jobTitle"
          fullWidth
          rows={4}
          variant="outlined"
          margin="normal"
          value={formData.jobTitle}
          onChange={handleInputChange}
        />
        <TextField
          label="Job Description"
          name="jobDescription"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={formData.jobDescription}
          onChange={handleInputChange}
        />
        <TextField
          label="Contact Info"
          name="contactInfo"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          margin="normal"
          value={formData.contactInfo}
          onChange={handleInputChange}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            fullWidth
            placeholder="Add tags"
            value={newTag} // Set value to newTag state
            onChange={(e) => setNewTag(e.target.value)} // Update newTag state on change
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission on Enter key
                handleTagAdd();
              }
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          marginTop={1}
          sx={{
            maxHeight: formData.tags.length > 6 ? 100 : "auto", // Set a maxHeight for scrollable behavior
            overflow: "auto", // Enable scrolling
          }}
        >
          {formData.tags.map((tag, index) => (
            <Chip
              key={index + tag}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
            />
          ))}
        </Stack>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput">
          <Stack direction="row" spacing={1} alignItems="center" marginTop={1}>
            <Typography variant="body1">Attach Document:</Typography>
            <IconButton component="span">
              <AttachFile />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              {formData.document ? formData.document.name : "No file chosen"}
            </Typography>
          </Stack>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateJobDialog;
