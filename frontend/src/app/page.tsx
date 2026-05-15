"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
    const [message, setMessage] = useState("loading...")
    const [uzyt, setuzyt] = useState([])
    const [czasNowy, setCzasNowy] = useState<number | null>(null)
    const getUsers = async () => {
        const users = await axios.get("http://127.0.0.1:8000/users")
        setuzyt(users.data)
    }
    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000")
            setMessage(response.data.message)
        }
        catch (error) {
            console.error(error)
        }
    }

    async function createUser() {

        await axios.post(
            "http://127.0.0.1:8000/users",
            {name:"pawe;2"}
        )

        getUsers()
    }

    useEffect(() => {
        const start = Date.now()
        fetchData()
        const end = Date.now()
        setCzasNowy(end - start)
    }, [])

    return (
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-5xl font-bold">
                {message}
                {czasNowy !== null ? ` (${czasNowy} ms)` : ""}
            </h1>
            <div className="mt-5 space-y-2">
                {uzyt.map((user: any) => (
                    <div
                        key={user.id}
                        className="border p-3 rounded"
                    >
                        {user.name}
                    </div>
                ))}
            </div>             <button
                onClick={createUser}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Add user
            </button>

        </div>
    )
}