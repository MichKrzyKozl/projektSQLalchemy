"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://127.0.0.1:8000";

type User = { id: number; name: string };
type Movie = { id: number; title: string };
type Actor = { id: number; name: string; surname: string };

export default function Home() {
  const router = useRouter();

  const [message, setMessage] = useState("loading...");
  const [users, setUsers] = useState<User[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);

  const [times, setTimes] = useState({
    message: 0,
    users: 0,
    movies: 0,
    actors: 0,
    total: 0,
  });

  async function fetchMessage() {
    const start = performance.now();

    const res = await axios.get(API_URL);
    setMessage(res.data.message);

    const end = performance.now();
    setTimes((prev) => ({ ...prev, message: end - start }));
  }

  async function fetchUsers() {
    const start = performance.now();

    const res = await axios.get(`${API_URL}/users`);
    setUsers(res.data);

    const end = performance.now();
    setTimes((prev) => ({ ...prev, users: end - start }));
  }

  async function fetchMovies() {
    const start = performance.now();

    const res = await axios.get(`${API_URL}/movies`);
    setMovies(res.data);

    const end = performance.now();
    setTimes((prev) => ({ ...prev, movies: end - start }));
  }

  async function fetchActors() {
    const start = performance.now();

    const res = await axios.get(`${API_URL}/actors`);
    setActors(res.data);

    const end = performance.now();
    setTimes((prev) => ({ ...prev, actors: end - start }));
  }

  useEffect(() => {
    const startTotal = performance.now();

    Promise.all([
      fetchMessage(),
      fetchUsers(),
      fetchMovies(),
      fetchActors(),
    ]).then(() => {
      const endTotal = performance.now();

      setTimes((prev) => ({
        ...prev,
        total: endTotal - startTotal,
      }));
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">{message}</h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">Load times</h2>

        <table className="border border-black w-96">
          <thead>
            <tr>
              <th className="border p-2">Function</th>
              <th className="border p-2">Time (ms)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-2">Message</td>
              <td className="border p-2">{times.message.toFixed(1)}</td>
            </tr>

            <tr>
              <td className="border p-2">Users</td>
              <td className="border p-2">{times.users.toFixed(1)}</td>
            </tr>

            <tr>
              <td className="border p-2">Movies</td>
              <td className="border p-2">{times.movies.toFixed(1)}</td>
            </tr>

            <tr>
              <td className="border p-2">Actors</td>
              <td className="border p-2">{times.actors.toFixed(1)}</td>
            </tr>

            <tr className="font-bold">
              <td className="border p-2">Total</td>
              <td className="border p-2">{times.total.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-10">
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

        <div>
          <h2 className="text-xl font-semibold mb-2">Actors</h2>
          <table className="border border-black w-64">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {actors.map((a) => (
                <tr key={a.id}>
                  <td className="border p-2">{a.id}</td>
                  <td className="border p-2">
                    {a.name} {a.surname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="border p-2">{m.id}</td>
                  <td className="border p-2">{m.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
