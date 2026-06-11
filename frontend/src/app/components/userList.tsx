export default function UserList({users,selectedUserId,setSelectedUserId}:any){
    return(
        <div>
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <table className="border border-black w-64">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u:any) => (
                <tr
                  key={u.id}
                  onClick={() => setSelectedUserId(u.id)}
                  className={`cursor-pointer hover:bg-gray-100 ${selectedUserId === u.id ? "bg-yellow-100 font-semibold" : ""}`}
                >
                  <td className="border p-2">{u.id}</td>
                  <td className="border p-2">{u.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}