"use client";
import { useSelectedUser } from "@/contexts/SelectedUserContext";
const API_URL = "http://127.0.0.1:8000";

export default function SeriesRatings({ seriesRating = [],deleteRating }: any)
{
    const { selectedUserId } = useSelectedUser();


    const avg =
        seriesRating.length > 0
            ? (
                  seriesRating.reduce(
                      (sum: number, r: any) =>
                          sum + (r.value ?? r.score ?? 0),
                      0
                  ) / seriesRating.length
              ).toFixed(1)
            : "0.0";

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
                Oceny użytkowników
            </h2>

            <h3>Średnia ocen: {avg}</h3>

            <ul className="list-disc list-inside">
                {seriesRating.length === 0 ? (
                    <li>Brak ocen</li>
                ) : (
                    seriesRating.map((r: any) => (
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