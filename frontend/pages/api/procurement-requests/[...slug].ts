import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ErrorResponse } from "../../../types/ErrorResponse";
import { ProcurementRequest } from "../../../types/ProcurementRequest";
import { FormattedProcurementRequest } from "../../../types/FormattedProcurementRequest";

async function handlerHelper(
    req: NextApiRequest,
): Promise<[number, ErrorResponse | ProcurementRequest | FormattedProcurementRequest]> {
    try {
        const { slug } = req.query;
        const uuid = slug[0];
        switch (req.method) {
            case "GET": {
                // TODO: return 404 if not found
                const response = await axios.get<FormattedProcurementRequest>(`http://localhost:5001/procurement-requests/${uuid}`);
                return [200, response.data];
            }
            case "POST": {
                const procurementRequestData: ProcurementRequest = req.body;
                console.log(procurementRequestData)
                const response = await axios.post<ProcurementRequest>(
                    `http://localhost:5001/procurement-requests/${uuid}`,
                    procurementRequestData, // Send procurement request data in the request body
                );
                return [200, response.data]; // Return response data instead of full response
            }
            default:
                return [405, { error: "Method Not Allowed" }];
        }
    } catch (error) {
        console.error("Error while fetching procurement requests:", error);
        return [500, { error: "Error while fetching procurement requests" }];
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProcurementRequest | ErrorResponse>,
) {
    const [status, response_data] = await handlerHelper(req);
    res.status(status).json(response_data);
}