import * as React from "react";
import { List } from "@mui/material";

import ProcurementRequestListItem from "../ProcurementRequestListItem";
import { FormattedProcurementRequest } from "../../types/FormattedProcurementRequest";

const ProcurementRequestList = ({ items }) => {
    return (
        <List sx={{ width: "100%", maxWidth: 1000 }}>
            {items.map((it: FormattedProcurementRequest) => (
                <ProcurementRequestListItem
                    key={it.uuid}
                    item={it}
                />
            ))}
        </List>
    );
};

export default ProcurementRequestList;