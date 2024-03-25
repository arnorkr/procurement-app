// components/ProcurementRequestDetails/index.tsx
import * as React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { FormattedProcurementRequest } from "../../types/FormattedProcurementRequest";

type ProcurementRequestDetailsProps = {
    procurementRequest: FormattedProcurementRequest;
};

const ProcurementRequestDetails: React.FC<ProcurementRequestDetailsProps> = ({ procurementRequest }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Procurement Request Details
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary={`Requestor Name: ${procurementRequest.requestor_name}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Description: ${procurementRequest.description}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Vendor Name: ${procurementRequest.vendor_name}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Department: ${procurementRequest.department}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Total Cost: ${procurementRequest.total_cost}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`VATIN: ${procurementRequest.vatin}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Commodity Group: ${procurementRequest.commodity_group}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Status: ${procurementRequest.status}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Positions:" />
                    <List>
                        {procurementRequest.positions.map((position, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`Description: ${position.description}, Unit Price: ${position.unit_price}, Amount: ${position.amount}, Unit: ${position.unit}, Total Price: ${position.total_price}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </ListItem>
            </List>
        </Box>
    );
};

export default ProcurementRequestDetails;