"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default function AddActor({ setMsg }: any) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/actors`, { name, surname, date_of_birth: dob });
      setMsg("Actor created");
      setName("");
      setSurname("");
      setDob("");
    } catch (err) {
      setMsg("Error creating actor");
    }
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold">Dodaj aktora</h2>
      <form onSubmit={submit} className="flex flex-col gap-2 max-w-md">
        <input className="border border-white p-2 rounded bg-transparent text-white" placeholder="Imie" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border border-white p-2 rounded bg-transparent text-white" placeholder="Nazwisko" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <input className="border border-white p-2 rounded bg-transparent text-white" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">Stwórz Aktor</button>
        </div>
      </form>
    </section>
  );
}
