// upload_document.tsx

import * as React from "react";
import { useState } from 'react'

import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

const PDFUploadPage: NextPage = () => {
    const [file, setFile] = useState<File>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        try {
            const data = new FormData()
            data.set('upload_file', file)
            const uuid = "e242d462-9708-4070-9550-eeb02e7949ff"
            // TODO: use Fast.js api
            // const res = await fetch(`/api/documents/${uuid}`, {
            const res = await fetch(`http://localhost:5001/documents/${uuid}`, {
                method: 'POST',
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
            />
            <input type="submit" value="Upload" />
        </form>
    )
}

export default PDFUploadPage;