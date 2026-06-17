import { useSelectedUser } from "@/contexts/SelectedUserContext";

export default function MovieRatings({ movieRating = [],deleteRating }: any)
{
      const { selectedUserId } = useSelectedUser();

    const avg =
        movieRating.length > 0
            ? (
                  movieRating.reduce(
                      (sum: number, r: any) => sum + r.value,
                      0
                  ) / movieRating.length
              ).toFixed(1)
            : "0.0";

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
                Oceny użytkowników
            </h2>

            <h3>Średnia ocen: {avg}</h3>

            <ul className="list-disc list-inside">
                {movieRating.length === 0 ? (
                    <li>Brak ocen</li>
                ) : (
                    movieRating.map((r: any) => (
                        <li key={r.id}>
                            {r.user_name}: {r.value}
                             {selectedUserId === r.user_id && (
                                <button
                                    className="ml-3 text-red-500"
                                    onClick={() => deleteRating(r.id)}
                                >
                                    Usuń
                                </button>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}