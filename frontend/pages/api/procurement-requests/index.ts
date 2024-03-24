import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ErrorResponse } from "../../../types/ErrorResponse";
import { ProcurementRequest } from "../../../types/ProcurementRequest";

// TODO: Only return needed fields
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProcurementRequest[] | ErrorResponse>,
) {
  if (req.method === "GET") {
    try {
      const response = await axios.get<ProcurementRequest[]>(
        "http://localhost:5001/procurement-requests",
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error while fetching procurement requests:", error);
      res.status(500).json({ error: "Error while fetching procurement requests" });
    }
  } else res.status(405).json({ error: "Method Not Allowed" });
}