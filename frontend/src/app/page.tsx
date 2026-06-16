"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelectedUser } from "../contexts/SelectedUserContext";
import SelectUser from "./components/selectUser";
import UserList from "./components/userList";
import ActorList from "./components/actorList";
import MovieList from "./components/movieList";
import SeriesList from "./components/seriesList";
const API_URL = "http://127.0.0.1:8000";

type User = { id: number; name: string };
type Actor = { id: number; name: string; surname: string };

export default function Home() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  
  const [actors, setActors] = useState<Actor[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const { selectedUserId, setSelectedUserId } = useSelectedUser();

  async function fetchUsers() {
    const res = await axios.get(`${API_URL}/users`);
    setUsers(res.data);
  }

  async function fetchActors() {
    const res = await axios.get(`${API_URL}/actors`);
    setActors(res.data);
  }

  useEffect(() => {
    fetchUsers();
    // MovieList handles its own movies/categories fetching now
    fetchSeries();
    fetchActors();
  }, []);

  async function fetchSeries(category?: any, sort?: any) {
    let url = `${API_URL}/series`;
    if (sort === "asc") url = `${API_URL}/series/asc`;
    else if (sort === "desc") url = `${API_URL}/series/desc`;
    const params = {
      category: category ?? undefined,
    };
    const res = await axios.get(url, { params });
    setSeries(res.data);
  }



  


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">

      <button
        className="bg-gray-800 text-white px-3 py-1 rounded"
        onClick={() => router.push('/admin')}
      >
        Admin Panel
      </button>

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
          actors={actors}
          router={router} />
        <MovieList router={router} />
        <SeriesList
          series={series}
          router={router} />
        
      </div>
    </div>
  );
}
