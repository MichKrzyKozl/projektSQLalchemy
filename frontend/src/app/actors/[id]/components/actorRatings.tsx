import { useSelectedUser } from "@/contexts/SelectedUserContext";

export default function ActorRating({ actorRating,deleteRating }: any) {
    
    const API_URL = "http://127.0.0.1:8000";
         const { selectedUserId } = useSelectedUser();

    return (
        <div>
            <span> średnia : {
                actorRating.length > 0
                    ? (
                        actorRating.reduce((suma: any, r: any) => suma + r.value, 0) /
                        actorRating.length
                    ).toFixed(1)
                    : "brak ocen"
            }</span>
            <ul className="list-disc list-inside">
                {actorRating.length === 0 ? (
                    <br />) : (
                    actorRating.map((r: any, i: number) => (
                        <li key={i}>{r.user_name} {r.value}  
                         {selectedUserId === r.user_id && (
                                <button
                                    className="ml-3 text-red-500"
                                    onClick={() => deleteRating(r.id)}
                                >
                                    Usuń
                                </button>
                            )}</li>
                    ))
                )}
            </ul> </div>
    )
}