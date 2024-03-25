import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ProcurementRequestDetails from "../../components/ProcurementRequestDetails";


const ProcurementDetailPage = () => {
    const router = useRouter();
    const { uuid } = router.query;
    const [request, setRequest] = useState(null);

    useEffect(() => {
        if (uuid)
            fetch(`/api/procurement-requests/${uuid}`)
                .then((response) => {
                    if (!response.ok) throw new Error("Procurement request not found");
                    return response.json();
                })
                .then(setRequest)
                .catch((error) => console.error("Error fetching procurement request:", error));
    }, [uuid]);

    if (!request) return <div>Loading...</div>;

    // TODO: add a back-button
    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <ProcurementRequestDetails procurementRequest={request} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ProcurementDetailPage;