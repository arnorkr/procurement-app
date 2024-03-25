import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ErrorResponse } from "../../../types/ErrorResponse";
import { ProcurementRequest } from "../../../types/ProcurementRequest";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProcurementRequest | ErrorResponse>,
) {
    try {
        const { slug } = req.query;
        const uuid = slug[0];
        if (req.method === "POST") {
            const response = await axios.post(
                `http://localhost:5001/documents/${uuid}`, // Assuming FastAPI is running on localhost:8000
                req.body,
                // { headers: { "Content-Type": "application/pdf" } }
            );
            res.status(response.status).json(response.data);
        } else
            res.status(405).json({ error: "Method Not Allowed" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Error uploading file" });
    }
}