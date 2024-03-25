import * as React from "react";
import { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from "@mui/material";
import { FormattedProcurementRequest } from "../../types/FormattedProcurementRequest";

type ProcurementRequestDetailsProps = {
    procurementRequest: FormattedProcurementRequest;
};

const ProcurementRequestDetails: React.FC<ProcurementRequestDetailsProps> = ({ procurementRequest }) => {
    const [editedRequest, setEditedRequest] = useState(procurementRequest);

    const handleInputChange = (fieldName: string, value: string) => {
        setEditedRequest((prevRequest) => ({
            ...prevRequest,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const data = JSON.stringify(editedRequest)
            const uuid = editedRequest.uuid
            const res = await fetch(`http://localhost:5001/procurement-requests/${uuid}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }

    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Procurement Request Details
            </Typography>
            <List>
                <ListItem>
                    <TextField
                        label="Requestor Name"
                        value={editedRequest.requestor_name || ""}
                        onChange={(e) => handleInputChange("requestor_name", e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Description"
                        value={editedRequest.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Vendor Name"
                        value={editedRequest.vendor_name || ""}
                        onChange={(e) => handleInputChange("vendor_name", e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Department"
                        value={editedRequest.department || ""}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Total Cost"
                        value={editedRequest.total_cost ? editedRequest.total_cost.toString() : ""}
                        type="number"
                        onChange={(e) => handleInputChange("total_cost", e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="VATIN"
                        value={editedRequest.vatin || ""}
                        onChange={(e) => handleInputChange("vatin", e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Commodity Group"
                        value={editedRequest.commodity_group || ""}
                        onChange={(e) => handleInputChange("commodity_group", e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Status"
                        value={editedRequest.status || ""}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Positions:" />
                    <List>
                        {editedRequest.positions.map((position, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`Description: ${position.description}, Unit Price: ${position.unit_price}, Amount: ${position.amount}, Unit: ${position.unit}, Total Price: ${position.total_price}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </ListItem>
            </List>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default ProcurementRequestDetails;