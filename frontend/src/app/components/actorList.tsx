"use client";

export default function ActorList({actors,router}:any){
    return(
        <div>
          <h2 className="text-xl font-semibold mb-2">Actors</h2>
          <table className="border border-black w-64">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {actors.map((a:any) => (
                <tr key={a.id} onClick={() => router.push(`/actors/${a.id}`)}>
                  <td className="border p-2">{a.id}</td>
                  <td className="border p-2">
                    {a.name} {a.surname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    )
}