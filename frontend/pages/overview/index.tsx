import * as React from "react";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

import ProcurementRequestList from "../../components/ProcurementRequestList";

const OverviewPage: NextPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch("/api/procurement-requests");
            const items = await response.json();
            setItems(items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={fetchItems}
                                sx={{ width: "50%", height: "4rem", fontSize: "1.2rem" }}
                            >
                                Refresh Items
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            {/* TODO: make it more obvious that the items are clickable */}
                            <ProcurementRequestList items={items} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default OverviewPage;