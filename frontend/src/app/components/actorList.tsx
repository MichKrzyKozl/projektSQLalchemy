"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

const tableClass = "border border-black w-64";
const headerCell = "border p-2 font-medium text-left";
const cell = "border p-2";
const rowInteractive = "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";

export default function ActorList({ router }: any)
{
    const [actors, setActors] = useState<any[]>([]);
    const [sortOrder, setSortOrder] = useState<string>("none");

    async function fetchActors()
    {
        const res = await axios.get(`${API_URL}/actors`);
        setActors(res.data);
    }

    useEffect(() =>
    {
        fetchActors();
    }, []);

    function sortActors(list: any[])
    {
        if (sortOrder === "none") return list;

        return [...list].sort((a, b) =>
        {
            const aa = a.avg_rating ?? 0;
            const bb = b.avg_rating ?? 0;

            if (sortOrder === "asc")
            {
                return aa - bb;
            }
            else
            {
                return bb - aa;
            }
        });
    }

    function handleSortChange(value: string)
    {
        setSortOrder(value);
    }

    const sortedActors = sortActors(actors);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Aktorzy</h2>

            <div className="flex flex-col gap-2 mb-2 border border-white p-6">
                <label className="font-medium">
                    Sortuj po średniej ocenie
                </label>

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
                        <th className={headerCell}>Imię i nazwisko</th>
                        <th className={headerCell}>Średnia ocena</th>
                        <th className={headerCell}>Rok urodzenia</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedActors.map((a: any) => (
                        <tr
                            key={a.id}
                            onClick={() => router.push(`/actors/${a.id}`)}
                            tabIndex={0}
                            onKeyDown={(e) =>
                            {
                                if (
                                    e.key === "Enter" ||
                                    e.key === " " ||
                                    e.key === "Spacebar"
                                )
                                {
                                    router.push(`/actors/${a.id}`);
                                }
                            }}
                            className={rowInteractive}
                        >
                            <td className={cell}>
                                {a.name} {a.surname}
                            </td>
                            <td className={cell}>
                                {a.avg_rating != null
                                    ? Number(a.avg_rating.toFixed(2))
                                    : "-"}
                            </td>
                            <td className={cell}>
                                {a.date_of_birth}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}