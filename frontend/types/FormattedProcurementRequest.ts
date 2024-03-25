import { Position } from "./Position";


// TODO: finish fill in all fields
export type FormattedProcurementRequest = {
    requestor_name: string | null;
    description: string | null;
    vendor_name: string | null;
    department: string | null;
    total_cost: number | null;
    vatin: string | null;
    commodity_group: string | null;
    // TODO: make enum
    status: string;
    uuid: string;
    positions: Position[];
};