export default function ActorSeries({actorSeries}:any){
    return(
        <>
         <div> Seriale </div>
      <div>
        {actorSeries && actorSeries.length > 0 ? (
          <ul>
            {actorSeries.map((r:any) => (
              <li key={r.role_id}>
                {r.title} — <em>{r.character_name}</em>
                {typeof r.avg_rating === 'number' ? (
                  <span> — ocena: {r.avg_rating.toFixed(1)}</span>
                ) : (
                  <span> — brak ocen</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div>Brak przypisanych ról</div>
        )}
      </div>
       </>
    )
}