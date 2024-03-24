import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { v5 as uuidv5 } from "uuid";

const RequestSubmissionPage: NextPage = () => {
    const [file, setFile] = React.useState<File | null>(null); // State to hold the selected file

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleClick = async () => {
        // FIXME:
        try {
            if (!file) {
                throw new Error("Please select a file to upload.");
            }

            const formData = new FormData();
            formData.append("file", file); // Append the selected file to FormData

            // Generate UUID for the document
            const uuid = uuidv5(file.name, uuidv5.URL);

            const response = await fetch(`/api/documents/${uuid}`, {
                method: "POST",
                body: formData, // Use FormData to send file data
            });

            if (!response.ok) {
                throw new Error("Failed to submit document.");
            }

            console.log("Document submitted successfully");
            // TODO: Show a success message
        } catch (error) {
            console.error("Error submitting document:", error);
            // TODO: Show an error message
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <input
                                type="file"
                                accept=".pdf" // Specify accepted file types
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span" // Render as span to style the file input
                                    sx={{ width: "50%", height: "4rem", fontSize: "1.2rem" }}
                                >
                                    Upload PDF
                                </Button>
                            </label>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default RequestSubmissionPage;