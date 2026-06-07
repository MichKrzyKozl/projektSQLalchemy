"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedUser } from "../../../contexts/SelectedUserContext";
import { useParams } from "next/navigation";

const API_URL = "http://127.0.0.1:8000";

type Movie = { id: number; title: string };
type Role = { id: number; character_name: string; actor_id?: number };
type Actor = { id: number; name: string; surname: string };

export default function MoviePage() {
  const { id } = useParams();
  const [rating, setRating] = useState(5);
  const [roleRatingsInput, setRoleRatingsInput] = useState<{
    [key: number]: number;
  }>({})
  const [movie, setMovie] = useState<Movie | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [movieRating, setMovieRating] = useState<any>([]);
  const [movieroleRatings, setMovieRoleRatings] = useState<any>({});

  const [times, setTimes] = useState({
    movie: 0,
    roles: 0,
    actors: 0,
    movieRating: 0,
    roleRatings: 0,
    total: 0
  });

  async function addReview() {

    const res = await axios.post(`${API_URL}/movieReview`, {
      value: rating,
      user_id: selectedUserId,
      reviewed_id: Number(id)

    });
    console.log(res.data)

  }
  async function addRoleReview(roleId: number) {
    const res = await axios.post(`${API_URL}/movieRoleReview`, {
      value: roleRatingsInput[roleId] || -1,
      user_id: selectedUserId,
      reviewed_id: roleId
    });

    console.log(res.data);
  }

  async function loadMovie() {
    const start = performance.now();

    const res = await axios.get(`${API_URL}/movies/${id}`);
    setMovie(res.data);

    const end = performance.now();

    setTimes(prev => ({ ...prev, movie: end - start }));
  }

  async function getRoles() {
    const start = performance.now();

    const res = await axios.get(`${API_URL}/movieroles/${id}`);
    setRoles(res.data);

    const end = performance.now();

    setTimes(prev => ({ ...prev, roles: end - start }));
  }

  async function getActors() {
    const start = performance.now();

    const res = await axios.get(`${API_URL}/movieactors/${id}`);
    setActors(res.data);

    const end = performance.now();

    setTimes(prev => ({ ...prev, actors: end - start }));
  }

  async function getMovieRating() {
    const start = performance.now();

    const res = await axios.get(`${API_URL}/movieratings/${id}`);
    setMovieRating(res.data);

    const end = performance.now();

    setTimes(prev => ({ ...prev, movieRating: end - start }));
  }

  async function getAllRoleRatings() {
    const start = performance.now();

    const results: any = {};

    for (const role of roles) {
      const res = await axios.get(`${API_URL}/roleratings/${role.id}`);
      results[role.id] = res.data;
    }

    setMovieRoleRatings(results);

    const end = performance.now();

    setTimes(prev => ({ ...prev, roleRatings: end - start }));
  }

  useEffect(() => {
    const startTotal = performance.now();

    Promise.all([
      loadMovie(),
      getRoles(),
      getActors(),
      getMovieRating()
    ]).then(() => {
      const endTotal = performance.now();

      setTimes(prev => ({
        ...prev,
        total: endTotal - startTotal
      }));
    });

  }, [id]);

  useEffect(() => {
    if (roles.length > 0) {
      getAllRoleRatings();
    }
  }, [roles]);

  const { selectedUserId, setSelectedUserId } = useSelectedUser();
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!selectedUserId) {
      setSelectedUserName(null);
      return;
    }

    (async () => {
      try {
        const res = await axios.get(`${API_URL}/users/${selectedUserId}`);
        if (mounted) setSelectedUserName(res.data?.name ?? String(selectedUserId));
      } catch (e) {
        if (mounted) setSelectedUserName(String(selectedUserId));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [selectedUserId]);

  if (!movie) {
    return <div className="p-10">loading...</div>;
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <div className="my-4">
        <strong>Acting as: </strong>
        {selectedUserId ? (
          <span className="ml-2">{selectedUserName ?? selectedUserId} <button className="ml-4 text-sm text-red-500" onClick={() => setSelectedUserId(null)}>Clear</button></span>
        ) : (
          <span className="ml-2 text-gray-500">(no user selected)</span>
        )}
      </div>
      <p>Movie ID: {movie.id}</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Performance</h2>

        <table className="border border-black w-96">
          <thead>
            <tr>
              <th className="border p-2">Request</th>
              <th className="border p-2">Time (ms)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-2">Movie</td>
              <td className="border p-2">{times.movie.toFixed(1)}</td>
            </tr>

            <tr>
              <td className="border p-2">Roles</td>
              <td className="border p-2">{times.roles.toFixed(1)}</td>
            </tr>

            <tr>
              <td className="border p-2">Actors</td>
              <td className="border p-2">{times.actors.toFixed(1)}</td>
            </tr>

            <tr>
              <td className="border p-2">Movie Rating</td>
              <td className="border p-2">{times.movieRating.toFixed(1)}</td>
            </tr>

            <tr>
              <td className="border p-2">Role Ratings (loop)</td>
              <td className="border p-2">{times.roleRatings.toFixed(1)}</td>
            </tr>

            <tr className="font-bold">
              <td className="border p-2">Total</td>
              <td className="border p-2">{times.total.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Characters</h2>

        <ul className="list-disc list-inside">
          {roles.map(role => {
            const actor = actors.find(a => a.id === role.actor_id);
            const ratings = movieroleRatings[role.id] || [];
            const avg_rating = ratings
              ? (
                ratings.reduce(
                  (sum: number, r: any) => sum + r.value,
                  0
                ) / ratings.length
              ).toFixed(1)
              : "-21.37";

            return (
              <li key={role.id}>
                {role.character_name} —{" "}
                {actor ? `${actor.name} ${actor.surname}` : "Unknown"} —{" "}
                {avg_rating}
                <div> parapapappap</div>
                {role.id}
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={roleRatingsInput[role.id] || 1}
                  onChange={(e) =>
                    setRoleRatingsInput({
                      ...roleRatingsInput,
                      [role.id]: Number(e.target.value)
                    })
                  }
                  style={{
                    accentColor:
                      (roleRatingsInput[role.id] || 5) <= 3
                        ? "red"
                        : (roleRatingsInput[role.id] || 5) <= 6
                          ? "orange"
                          : "green"
                  }}
                  className="w-full"
                />

                <div className="text-center text-lg font-bold">
                  {roleRatingsInput[role.id] || 1} / 10
                </div>

                <button
                  onClick={() => addRoleReview(role.id)}
                  className="bg-gray-400 text-white py-2 rounded-lg hover:bg-white-700 cursor-pointer active:scale-95 transition"
                >
                  Dodaj
                </button>
              </li>
            );
          })}
        </ul>
      </div>


      {/* trololelo trololo inne tutaj funckje są */}
      <div className=" border  p-4 shadow-md w-64 flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Add movie review</h3>

        <input
          type="range"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{
            accentColor:
              rating <= 3 ? "red" : rating <= 6 ? "orange" : "green"
          }}
          className="w-full"
        />

        <div className="text-center text-lg font-bold">
          {rating} / 10
        </div>

        <button
          onClick={addReview}
          className="bg-gray-400 text-white py-2 rounded-lg hover:bg-white-700 cursor-pointer active:scale-95 transition"
        >
          Dodaj
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Ratings</h2>

        <h3>
          average:{" "}
          {movieRating.length
            ? (
              movieRating.reduce(
                (sum: number, r: any) => sum + (r.value ?? r.score ?? 0),
                0
              ) / movieRating.length
            ).toFixed(1)
            : "0.0"}
        </h3>

        <ul className="list-disc list-inside">
          {movieRating.length === 0 ? (
            <li>No ratings yet</li>
          ) : (
            movieRating.map((r: any, i: number) => (
              <li key={i}>{r.value}</li>
            ))
          )}
        </ul>
      </div>

    </div>
  );
}