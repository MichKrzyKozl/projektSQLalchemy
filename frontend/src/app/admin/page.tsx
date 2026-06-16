"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddActor from "./components/addActor";
import AddMovie from "./components/addMovie";
import AddSeries from "./components/addSeries";
import AddRole from "./components/addRole";

export default function AdminPage() {
    const router = useRouter();
    const [msg, setMsg] = useState("");

    return (
        <div className="p-10 text-white min-h-screen">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="my-2 text-green-700">{msg}</p>
            <button className="bg-gray-200 px-3 py-1 rounded mb-4" type="button" onClick={() => router.push('/')}>Back</button>

            <AddActor setMsg={setMsg} />
            <AddRole setMsg={setMsg} />
            <AddMovie setMsg={setMsg} />
            <AddSeries setMsg={setMsg} />
        </div>
    );
}
