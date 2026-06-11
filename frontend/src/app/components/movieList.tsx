"use client";

export default function MovieList({ movies, router }: any) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Movies</h2>
            <table className="border border-black w-64">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">tytuł</th>
                        <th className="border p-2">Srednia ocena</th>
                        <th className="border p-2">data wydania</th>


                    </tr>
                </thead>
                <tbody>
                    {movies.map((m: any) => (
                        <tr
                            key={m.id}
                            onClick={() => router.push(`/movies/${m.id}`)}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            <td className="border p-2">{m.id}</td>
                            <td className="border p-2">{m.title}</td>
                            <td className="border p-2">{m.release_date}</td>
                            <td className="border p-2">{Number(m.avg_rating.toFixed(2))}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}