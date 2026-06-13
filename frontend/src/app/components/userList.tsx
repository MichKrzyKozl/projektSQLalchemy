const tableClass = "border border-black w-64";
const headerCell = "border p-2 font-medium text-left";
const cell = "border p-2";
const rowInteractive = "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";
const selectedRow = "bg-gray-800 font-semibold";

export default function UserList({users,selectedUserId,setSelectedUserId}:any){
    return(
        <div>
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={headerCell}>ID</th>
                <th className={headerCell}>Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u:any) => (
                <tr
                  key={u.id}
                  onClick={() => setSelectedUserId(u.id)}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') setSelectedUserId(u.id) }}
                  className={`${rowInteractive} ${selectedUserId === u.id ? selectedRow : ""}`}
                >
                  <td className={cell}>{u.id}</td>
                  <td className={cell}>{u.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}