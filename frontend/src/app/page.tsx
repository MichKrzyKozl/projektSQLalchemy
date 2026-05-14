"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
    const [message, setMessage] = useState("loading...")

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000")
            .then((response) => {
                setMessage(response.data.message)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-5xl font-bold">
                {message}
            </h1>
        </div>
    )
}