"use client";

import React from "react";

type Props = {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  addReview: () => Promise<void> | void;
};

export default function ActorReview({ rating, setRating, addReview }: Props) {
  return (
    <div className=" border  p-4 shadow-md w-64 flex flex-col gap-3">
    

      <input
        type="range"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        style={{
          accentColor: rating <= 3 ? "red" : rating <= 6 ? "orange" : "green"
        }}
        className="w-full"
      />

      <div className="text-center text-lg font-bold">{rating} / 10</div>

      <button
        onClick={addReview}
        className="bg-gray-400 text-white py-2 rounded-lg hover:bg-white-700 cursor-pointer active:scale-95 transition"
      >
        Oceń aktora
      </button>
    </div>
  );
}
