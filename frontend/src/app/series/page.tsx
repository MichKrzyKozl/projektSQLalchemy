"use client";

"use client";

import { useRouter } from "next/navigation";
import SeriesList from "../components/seriesList";

export default function SeriesPage() {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Series</h1>
      <SeriesList router={router} />
    </div>
  );
}
