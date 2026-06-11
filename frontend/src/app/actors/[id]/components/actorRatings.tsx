import { useEffect, useState } from "react";
import axios from "axios";

export default function ActorRating({ actorRating }: any) {
    
    const API_URL = "http://127.0.0.1:8000";
   
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
                        <li key={i}>{r.user_name} {r.value} </li>
                    ))
                )}
            </ul> </div>
    )
}