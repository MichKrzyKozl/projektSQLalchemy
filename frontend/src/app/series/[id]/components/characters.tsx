"use client";

import React from "react";

type Role = { id: number; character_name: string; actor_id?: number };
type Actor = { id: number; name: string; surname: string };

type Props = {
  roles: Role[];
  actors: Actor[];
  movieroleRatings: Record<number, any[]>;
  roleRatingsInput: { [key: number]: number };
  setRoleRatingsInput: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  addRoleReview: (roleId: number) => Promise<void> | void;
};

export default function Characters({ roles, actors, movieroleRatings, roleRatingsInput, setRoleRatingsInput, addRoleReview }: Props) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Characters</h2>

      <ul className=" list-inside">
        {roles.map(role => {
          const actor = actors.find(a => a.id === role.actor_id);
          const ratings = movieroleRatings[role.id] || [];
          const avg_rating = ratings
            ? (
              ratings.reduce(
                (sum: number, r: any) => sum + r.value,
                0
              ) / ratings.length
            ).toFixed(1)
            : "-21.37";

          return (
            <li key={role.id} className="mb-4">
              <div>
                {role.character_name} —{" "}
                {actor ? `${actor.name} ${actor.surname}` : "Unknown"} —{" "}
                {avg_rating}
              </div>

              <div className="flex items-center gap-3 mt-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={roleRatingsInput[role.id] || 1}
                  onChange={(e) =>
                    setRoleRatingsInput({
                      ...roleRatingsInput,
                      [role.id]: Number(e.target.value)
                    })
                  }
                  className="w-48"
                />

                <span className="font-bold">
                  {roleRatingsInput[role.id] || 1}/10
                </span>

                <button
                  onClick={() => addRoleReview(role.id)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Dodaj
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}
