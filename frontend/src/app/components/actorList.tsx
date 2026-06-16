"use client";

 const tableWrap = "";
 const tableClass = "border border-black w-64";
 const headerCell = "border p-2 font-medium text-left";
 const cell = "border p-2";
 const rowInteractive = "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";
 const selectedRow = "bg-yellow-100 font-semibold";
export default function ActorList({ actors, router }: any) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Actors</h2>
            <table className={tableClass}>
                <thead>
                    <tr>
                        <th className={headerCell}>ID</th>
                        <th className={headerCell}>Imię i nazwisko</th>
                        <th className={headerCell}>średnia ocena</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((a: any) => (
                        <tr
                            key={a.id}
                            onClick={() => router.push(`/actors/${a.id}`)}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') router.push(`/actors/${a.id}`)
                            }}
                            className={rowInteractive}
                        >
                            <td className={cell}>{a.id}</td>
                            <td className={cell}>
                                {a.name} {a.surname}
                            </td>
                            <td className={cell}>{a.avg_rating != null ? Number(a.avg_rating.toFixed(2)) : "-"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}