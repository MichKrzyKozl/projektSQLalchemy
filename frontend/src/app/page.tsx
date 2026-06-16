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
type Movie = { id: number; title: string };
type Actor = { id: number; name: string; surname: string };
type SeriesType = { id: number; title: string; category?: string; avg_rating?: number; release_date?: any };

export default function Home() {
  const router = useRouter();

  const [message, setMessage] = useState("ładowanieg...");
  const [users, setUsers] = useState<User[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<any>("none");
  const [actors, setActors] = useState<Actor[]>([]);
  const [series, setSeries] = useState<SeriesType[]>([]);
  const { selectedUserId, setSelectedUserId } = useSelectedUser();

  async function fetchMessage() {
    const res = await axios.get(API_URL);
    setMessage(res.data.message);
  }

  async function fetchUsers() {
    const res = await axios.get(`${API_URL}/users`);
    setUsers(res.data);
  }

  async function fetchMovies(category?: any, sort?: any) {
    let url = `${API_URL}/movies`;
    if (sort === "asc") url = `${API_URL}/movies/asc`;
    else if (sort === "desc") url = `${API_URL}/movies/desc`;
    const params = {
      category: category ?? undefined
    };
    const res = await axios.get(url, { params });
    setMovies(res.data);
  }

  async function fetchActors() {
    const res = await axios.get(`${API_URL}/actors`);
    setActors(res.data);
  }

  async function fetchAllCategories() {
    const res = await axios.get(`${API_URL}/categories`);
    setAllCategories(res.data);

  }

  useEffect(() => {
    fetchMessage();
    fetchUsers();
    fetchMovies();
    fetchAllCategories();
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



  function handleSortChange(sort: any) {
    setSortOrder(sort);

    let selectedSort = sort;

    if (sort === "none") {
      selectedSort = undefined;
    }

    fetchMovies(
      categoryFilter || undefined,
      selectedSort
    );
    fetchSeries(
      categoryFilter || undefined,
      selectedSort
    );
  }

  function handleCategoryChange(category: any) {
    setCategoryFilter(category);

    let selectedCategory = category;
    let selectedSort = sortOrder;

    if (category === "") {
      selectedCategory = undefined;
    }

    if (sortOrder === "none") {
      selectedSort = undefined;
    }

    fetchMovies(
      selectedCategory,
      selectedSort
    );
    fetchSeries(
      selectedCategory,
      selectedSort
    );
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">{message}</h1>

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
        <MovieList
          movies={movies}
          router={router} />
        <SeriesList
          series={series}
          router={router} />
        <div className="flex flex-col gap-2">
          <label className="font-medium">Kategoria</label>
          <select
            value={categoryFilter}
            onChange={(e) =>
              handleCategoryChange(
                e.target.value
              )
            }
          >
            <option value="">Wszystkie</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="font-medium mt-2">Sortuj po średniej ocenie</label>
          <select
            value={sortOrder}
            onChange={(e) =>
              handleSortChange(
                e.target.value
              )
            }
          >
            <option value="none">Brak</option>
            <option value="asc">Rosnąco</option>
            <option value="desc">Malejąco</option>
          </select>
        </div>
      </div>
    </div>
  );
}
