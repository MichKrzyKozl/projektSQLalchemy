"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = "http://127.0.0.1:8000";

type Movie = {
  id: number;
  title: string;
};

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  async function getRoles() {
    const res = await axios.get(`${API_URL}/movieroles/${id}`);
    setRoles(res.data);
  }
  async function load() {
    try {
      const res = await axios.get(`${API_URL}/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("movie error:", err);
    }
  }
  useEffect(() => {
    load();
    getRoles();
  }, [id]);

  if (!movie) {
    return <div className="p-10">loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p>Movie ID: {movie.id}</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Role:</h2>
        <ul className="list-disc list-inside">
          {roles.map((role, index) => (
            <li key={index}>{role.character_name || "Unknown role"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
