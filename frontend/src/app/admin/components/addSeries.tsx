"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default function AddSeries({ setMsg }: any) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [release, setRelease] = useState("");
  const [seasons, setSeasons] = useState<any>(1);

  async function submit(e: any) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/series`, { title, category, release_date: release, seasons: seasons || 0 });
      setMsg("Series created");
      setTitle("");
      setCategory("");
      setRelease("");
      setSeasons(1);
    } catch (err) {
      setMsg("Error creating series");
    }
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold">Add Series</h2>
      <form onSubmit={submit} className="flex flex-col gap-2 max-w-md">
        <input className="border border-white p-2 rounded bg-transparent text-white" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="border border-white p-2 rounded bg-transparent text-white" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="border border-white p-2 rounded bg-transparent text-white" type="date" value={release} onChange={(e) => setRelease(e.target.value)} />
        <input className="border border-white p-2 rounded bg-transparent text-white" type="number" placeholder="Seasons" value={seasons as any} onChange={(e) => setSeasons(e.target.value === "" ? "" : Number(e.target.value))} />
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">Create Series</button>
        </div>
      </form>
    </section>
  );
}
