import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ErrorResponse } from "../../../types/ErrorResponse";
import { ProcurementRequest } from "../../../types/ProcurementRequest";

// TODO: responde with 404 if request is not found
async function handlerHelper(
  req: NextApiRequest,
): Promise<number | [number, ErrorResponse | ProcurementRequest ]> {
  try {
    const { slug } = req.query;
    const uuid = slug[0];
    switch (req.method) {
      case "POST": {
        const procurementRequestData: ProcurementRequest = req.body;
        console.log(procurementRequestData)
        const response = await axios.post<ProcurementRequest>(
            `http://localhost:5001/procurement-requests/${uuid}`,
            procurementRequestData, // Send procurement request data in the request body
        );
        return [201, response.data]; // Return response data instead of full response
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