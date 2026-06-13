"use client";

const tableClass = "border border-black w-64";
const headerCell = "border p-2 font-medium text-left";
const cell = "border p-2";
const rowInteractive = "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";
const selectedRow = "bg-yellow-100 font-semibold";

export default function MovieList({ movies, router }: any) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Movies</h2>
            <table className={tableClass}>
                <thead>
                    <tr>
                        <th className={headerCell}>ID</th>
                        <th className={headerCell}>tytuł</th>
                        <th className={headerCell}>Kategoria</th>
                        <th className={headerCell}>Srednia ocena</th>
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
                            <td className={cell}>{m.release_date}</td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}