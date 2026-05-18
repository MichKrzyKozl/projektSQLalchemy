"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://127.0.0.1:8000";

type User = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
};

export default function Home() {
  const [message, setMessage] = useState("loading...");
  const [loadTime, setLoadTime] = useState<number | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();
  async function fetchMessage() {
    const start = Date.now();

    try {
      const res = await axios.get(API_URL);
      const end = Date.now();

      setMessage(res.data.message);
      setLoadTime(end - start);
    } catch (err) {
      console.error("message error:", err);
    }
  }

  async function fetchUsers() {
    try {
      const res = await axios.get(`${API_URL}/users`);
      res.data;
    } catch (err) {
      console.error("users error:", err);
    }
  }

  async function fetchMovies() {
    try {
      const res = await axios.get(`${API_URL}/movies`);
      setMovies(res.data);
    } catch (err) {
      console.error("movies error:", err);
    }
  }

  async function createUser() {
    try {
      await axios.post(`${API_URL}/users`, {
        name: "Paweł",
      });

      fetchUsers();
    } catch (err) {
      console.error("create user error:", err);
    }
  }

  useEffect(() => {
    fetchMessage();
    fetchUsers();
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">
        {message}
        {loadTime !== null && ` (${loadTime} ms)`}
      </h1>
      <div className="flex gap-10">
        {/* USERS TABLE */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Users</h2>

          <table className="border border-black w-64">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="border p-2">{u.id}</td>
                  <td className="border p-2">{u.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOVIES TABLE */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Movies</h2>

          <table className="border border-black w-64">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Title</th>
              </tr>
            </thead>

            <tbody>
              {movies.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => router.push(`/movies/${m.id}`)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  <td className="border p-2">{m.id}</td>
                  <td className="border p-2">{m.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={createUser}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add user
        </button>
      </div>
    </div>
  );
}
