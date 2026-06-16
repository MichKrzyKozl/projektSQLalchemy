export default function SeriesRatings({movieRating} :any){
    return(
         <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Ratings</h2>

        <h3>
          average:{" "}
          {movieRating.length
            ? (
              movieRating.reduce(
                (sum: number, r: any) => sum + (r.value ?? r.score ?? 0),
                0
              ) / movieRating.length
            ).toFixed(1)
            : "0.0"}
        </h3>

        <ul className="list-disc list-inside">
          {movieRating.length === 0 ? (
            <li>No ratings yet</li>
          ) : (
            movieRating.map((r: any, i: number) => (
              <li key={i}>{r.value}</li>
            ))
          )}
        </ul>
      </div>
    )
}
