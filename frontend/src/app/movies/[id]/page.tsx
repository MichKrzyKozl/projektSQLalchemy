"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = "http://127.0.0.1:8000";

type Movie = {
  id: number;
  title: string;
};

type Role = {
  id:number;
  character_name: string;
  actor_id?: number;
};

type Actor = {
  id: number;
  name: string;
  surname: string;
};

export default function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [movieRating, setMovieRating] = useState<any>([]);
const [roleRatings, setRoleRatings] = useState<any>({});
  async function getRoles() {
    const res = await axios.get(`${API_URL}/movieroles/${id}`);
    setRoles(res.data);
  }


  async function getActors() {
    const res = await axios.get(`${API_URL}/movieactors/${id}`);
    setActors(res.data);
  }

  async function load() {
    try {
      const res = await axios.get(`${API_URL}/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("movie error:", err);
    }
  }

  async function getMovieRating() {
    const res = await axios.get(`${API_URL}/movieratings/${id}`);
    setMovieRating(res.data);
  }

  async function getRoleRating(role_id :number){
    const res = await axios.get(`${API_URL}/roleratings/${role_id}`);
    return(res.data);
  }
  async function getAllRoleRatings() {
  const results: any = {};

  for (const role of roles) {
    const res = await axios.get(`${API_URL}/roleratings/${role.id}`);
    results[role.id] = res.data;
  }

  setRoleRatings(results);
}

  useEffect(() => {
    load();
    getRoles();
    getActors();
    getMovieRating();
  }, [id]);
useEffect(() => {
  if (roles.length > 0) {
    getAllRoleRatings();
  }
}, [roles]);
  if (!movie) {
    return <div className="p-10">loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{movie.title}</h1>

      <p>Movie ID: {movie.id}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Characters:</h2>

        <ul className="list-disc list-inside">
          {roles.map((role, index) => {
            const actor = actors.find((temp) => temp.id === role.actor_id);
            return (
              <li key={index}>
                {role.character_name || "Unknown role"}
                {" — "}
                {actor ? `${actor.name} ${actor.surname}` : "Unknown actor"}
                {"---"}
                {roleRatings[role.id]?.length || 0}

                
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Ratings:</h2>
        <h3>
          average: {movieRating.length ? (movieRating.reduce((sum: number, rating: any) => sum + (rating.value ?? rating.score ?? 0), 0) / movieRating.length).toFixed(1) : "0.0"}
        </h3>
        <ul className="list-disc list-inside">
          {movieRating.length === 0 ? (
            <li>No ratings yet</li>
          ) : (
            movieRating.map((rating: any, index: number) => (
              <li key={index}>
               {rating.value}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
