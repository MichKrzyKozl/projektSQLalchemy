"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelectedUser } from "../contexts/SelectedUserContext";
import SelectUser from "./components/selectUser";
import UserList from "./components/userList";
import ActorList from "./components/actorList";
import MovieList from "./components/movieList";
const API_URL = "http://127.0.0.1:8000";

type User = { id: number; name: string };
type Movie = { id: number; title: string };
type Actor = { id: number; name: string; surname: string };

export default function Home() {
  const router = useRouter();

  const [message, setMessage] = useState("ładowanieg...");
  const [users, setUsers] = useState<User[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const { selectedUserId, setSelectedUserId } = useSelectedUser();

  async function fetchMessage() {
    const res = await axios.get(API_URL);
    setMessage(res.data.message);
  }

  async function fetchUsers() {
    const res = await axios.get(`${API_URL}/users`);
    setUsers(res.data);
  }

  async function fetchMovies() {
    const res = await axios.get(`${API_URL}/movies`);
    console.log(res)
        console.log(res.data)
    setMovies(res.data);
  }

  async function fetchActors() {
    const res = await axios.get(`${API_URL}/actors`);
    setActors(res.data);
  }

  useEffect(() => {
    fetchMessage();
    fetchUsers();
    fetchMovies();
    fetchActors();
  }, []);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">{message}</h1>

      <SelectUser
        selectedUserId={selectedUserId}
        selectedUserName={users.find((u) => u.id === selectedUserId)?.name ?? null}
        setSelectedUserId={setSelectedUserId}
      />
      <div className="flex gap-10">

      <UserList
        users={users}
        selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}
      />
    <ActorList
    actors = {actors}
    router ={router}/>
    <MovieList
    movies = {movies}
    router ={router}/>


        
        
      </div>
    </div>
  );
}
