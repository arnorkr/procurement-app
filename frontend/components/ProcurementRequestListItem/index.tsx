
import * as React from "react";

import { ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

const ProcurementRequestListItem = ({ item }) => {
    return (
        <ListItem key={item.uuid} >
            <Link href={`/overview/${item.uuid}`} passHref>
                <ListItemText
                    primary={`${item.description}`}
                    secondary={`Status: ${item.status}`}
                />
            </Link>
        </ListItem>
    );
};

export default ProcurementRequestListItem;