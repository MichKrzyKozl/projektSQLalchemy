"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home()
{
    const [message, setMessage] = useState("loading...")
    const [czasNowy, setCzasNowy] = useState<number | null>(null)

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try 
            {
                const start = Date.now()
                const response = await axios.get("http://127.0.0.1:8000")
                const end = Date.now()
                setMessage(response.data.message)
                setCzasNowy(end - start)
            }
            catch (error)
            {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-5xl font-bold">
                {message}
                {czasNowy !== null ? ` (${czasNowy} ms)` : ""}
            </h1>
        </div>
    )
}