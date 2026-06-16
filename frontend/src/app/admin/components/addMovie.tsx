"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default function AddMovie({ setMsg }: any) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [release, setRelease] = useState("");
    const [runtime, setRuntime] = useState<number | "">("");

    async function submit(e: any) {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/movies`, { title, category, release_date: release, runtime_minutes: runtime || 0 });
            setMsg("Movie created");
            setTitle("");
            setCategory("");
            setRelease("");
            setRuntime("");
        } catch (err) {
            setMsg("Error creating movie");
        }
    }

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold">Add Movie</h2>
            <form onSubmit={submit} className="flex flex-col gap-2 max-w-md">
                <input className="border border-white p-2 rounded bg-transparent text-white" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className="border border-white p-2 rounded bg-transparent text-white" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <input className="border border-white p-2 rounded bg-transparent text-white" type="date" value={release} onChange={(e) => setRelease(e.target.value)} />
                <input className="border border-white p-2 rounded bg-transparent text-white" type="number" placeholder="Runtime minutes" value={runtime as any} onChange={(e) => setRuntime(e.target.value === "" ? "" : Number(e.target.value))} />
                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">Create Movie</button>
                </div>
            </form>
        </section>
    );
}
