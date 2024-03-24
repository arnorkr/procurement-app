import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { TextareaAutosize } from '@mui/base';
import crypto from "crypto";
import { v5 as uuidv5 } from "uuid";

function generateUUIDFromText(inputText: string): string {
    // Hash the input text using SHA-256
    const hashedText = crypto.createHash('sha256').update(inputText).digest('hex');
    // Generate a UUID from the hash using UUIDv5
    return uuidv5(hashedText, uuidv5.URL);
}

const RequestSubmissionPage: NextPage = () => {
    const [inputValue, setInputValue] = React.useState<string>("");

    const handleClick = async () => {
        try {
            const body = JSON.stringify({ body: inputValue })
            const uuid = generateUUIDFromText(inputValue)
            const response = await fetch(`/api/procurement-requests/${uuid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body,
            });
            console.log(body)
            if (!response.ok)
                throw new Error("Failed to submit procurement request");
            console.log("Procurement request submitted successfully");
            // TODO: show a success message and clear the input form
        } catch (error) {
            console.error("Error submitting procurement request:", error);
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Minimum 3 rows"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClick}
                                sx={{ width: "50%", height: "4rem", fontSize: "1.2rem" }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default RequestSubmissionPage;