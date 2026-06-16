"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

const tableClass = "border border-black w-64";
const headerCell = "border p-2 font-medium text-left";
const cell = "border p-2";
const rowInteractive = "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";
const selectedRow = "bg-yellow-100 font-semibold";

export default function MovieList({ router }: any) {
    const [movies, setMovies] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<any>("none");

    async function fetchMovies(category?: any, sort?: any) {
        let url = `${API_URL}/movies`;
        if (sort === "asc") url = `${API_URL}/movies/asc`;
        else if (sort === "desc") url = `${API_URL}/movies/desc`;
        const params = {
            category: category ?? undefined,
        };
        const res = await axios.get(url, { params });
        setMovies(res.data);
    }

    async function fetchAllCategories() {
        const res = await axios.get(`${API_URL}/categories`);
        setAllCategories(res.data);
    }

    useEffect(() => {
        fetchMovies();
        fetchAllCategories();
    }, []);

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
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Movies</h2>

            <div className="flex flex-col gap-2 mb-2">
                <label className="font-medium">Kategoria</label>
                <select
                    value={categoryFilter}
                    onChange={(e) => handleCategoryChange(e.target.value)}
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
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="none">Brak</option>
                    <option value="asc">Rosnąco</option>
                    <option value="desc">Malejąco</option>
                </select>
            </div>

            <table className={tableClass}>
                <thead>
                    <tr>
                        <th className={headerCell}>ID</th>
                        <th className={headerCell}>tytuł</th>
                        <th className={headerCell}>Kategoria</th>
                        <th className={headerCell}>Srednia ocena</th>
                        <th className={headerCell}>Długośc</th>
                        <th className={headerCell}>data wydania</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m: any) => (
                        <tr
                            key={m.id}
                            onClick={() => router.push(`/movies/${m.id}`)}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') router.push(`/movies/${m.id}`)
                            }}
                            className={rowInteractive}
                        >
                            <td className={cell}>{m.id}</td>
                            <td className={cell}>{m.title}</td>
                            <td className={cell}>{m.category}</td>

                            <td className={cell}>{m.avg_rating != null ? Number(m.avg_rating.toFixed(2)) : "-"}</td>
                            <td className={cell}>{m.runtime_minutes}m</td>
                            <td className={cell}>{m.release_date}</td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}