"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedUser } from "../../../contexts/SelectedUserContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Characters from "./components/characters"
import MovieReview from "./components/movieReview";
import SelectUser from "../../components/selectUser";
import MovieRatings from "./components/movieRatings";
const API_URL = "http://127.0.0.1:8000";

type Movie = { id: number; title: string; release_date: any };
type Role = { id: number; character_name: string; actor_id?: number };
type Actor = { id: number; name: string; surname: string,date_of_birth:any };

export default function MoviePage() {
  const router = useRouter();
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

  const { selectedUserId, setSelectedUserId } = useSelectedUser();

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
    const res = await axios.get(`${API_URL}/movies/${id}`);
    setMovie(res.data);
  }

  async function getRoles() {
    const res = await axios.get(`${API_URL}/movieroles/${id}`);
    setRoles(res.data);
  }

  async function getActors() {
    const res = await axios.get(`${API_URL}/movieactors/${id}`);
    setActors(res.data);
  }

  async function getMovieRating() {
    const res = await axios.get(`${API_URL}/movieratings/${id}`);
    setMovieRating(res.data);
  }

  async function getAllRoleRatings() {
    const results: any = {};

    for (const role of roles) {
      const res = await axios.get(`${API_URL}/roleratings/${role.id}`);
      results[role.id] = res.data;
    }

    setMovieRoleRatings(results);
  }

  useEffect(() => {
    loadMovie()
    getRoles()
    getActors()
    getMovieRating()
  }, [id]);

  useEffect(() => {
    if (roles.length > 0) {
      getAllRoleRatings();
    }
  }, [roles]);

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
    return <div className="p-10">ładowanie...</div>;
  }

  return (
    <div className="p-10">
      <div onClick={() => router.push(`/`)}
      > Strona głowna </div>
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <SelectUser
        selectedUserId={selectedUserId}
        selectedUserName={selectedUserName}
        setSelectedUserId={setSelectedUserId} />

      <p>Data wydania: {movie.release_date}</p>

      <Characters
        roles={roles}
        actors={actors}
        movieroleRatings={movieroleRatings}
        roleRatingsInput={roleRatingsInput}
        setRoleRatingsInput={setRoleRatingsInput}
        addRoleReview={addRoleReview}
      />
      <MovieReview
        rating={rating}
        setRating={setRating}
        addReview={addReview} />

      <MovieRatings
        movieRating={movieRating} />
    </div>
  );
}