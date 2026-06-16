"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default function AddRole({ setMsg }: { setMsg: (m: string) => void }) {
    const [actorsList, setActorsList] = useState<any[]>([]);
    const [moviesList, setMoviesList] = useState<any[]>([]);
    const [seriesList, setSeriesList] = useState<any[]>([]);

    const [character, setCharacter] = useState("");
    const [actorId, setActorId] = useState<number | null>(null);
    const [targetType, setTargetType] = useState<'movie' | 'series'>('movie');
    const [movieId, setMovieId] = useState<number | null>(null);
    const [seriesId, setSeriesId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchLists() {
            const [aRes, mRes, sRes] = await Promise.all([
                axios.get(`${API_URL}/actors`),
                axios.get(`${API_URL}/movies`),
                axios.get(`${API_URL}/series`),
            ]);
            setActorsList(aRes.data);
            setMoviesList(mRes.data);
            setSeriesList(sRes.data);

        }
        fetchLists();
    }, []);

    async function submit(e: any) {
        e.preventDefault();
        try {
            if (!actorId || !character) { setMsg('Select actor and character'); return; }
            if (targetType === 'movie') {
                if (!movieId) { setMsg('Select movie'); return; }
                await axios.post(`${API_URL}/movieroles`, { character_name: character, actor_id: actorId, movie_id: movieId });
            } else {
                if (!seriesId) { setMsg('Select series'); return; }
                await axios.post(`${API_URL}/seriesroles`, { character_name: character, actor_id: actorId, series_id: seriesId });
            }
            setMsg('Role created');
            setCharacter(''); setActorId(null); setMovieId(null); setSeriesId(null);
        } catch (err) {
            setMsg('Error creating role');
        }
    }

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold">Add Role</h2>
            <form onSubmit={submit} className="flex flex-col gap-2 max-w-md">
                <input className="border border-white p-2 rounded bg-transparent text-white" placeholder="Character name" value={character} onChange={(e) => setCharacter(e.target.value)} />
                <label className="font-medium">Actor</label>
                <select className="border border-white p-2 rounded bg-transparent text-white" value={actorId ?? ''} onChange={(e) => setActorId(Number(e.target.value) || null)}>
                    <option value="">Select actor</option>
                    {actorsList.map(a => (<option key={a.id} value={a.id}>{a.name} {a.surname}</option>))}
                </select>

                <label className="font-medium">Target</label>
                <div className="flex gap-2">
                    <label><input type="radio" checked={targetType === 'movie'} onChange={() => setTargetType('movie')} /> Movie</label>
                    <label><input type="radio" checked={targetType === 'series'} onChange={() => setTargetType('series')} /> Series</label>
                </div>

                {targetType === 'movie' ? (
                    <>
                        <label className="font-medium">Movie</label>
                        <select className="border border-white p-2 rounded bg-transparent text-white" value={movieId ?? ''} onChange={(e) => setMovieId(Number(e.target.value) || null)}>
                            <option value="">Select movie</option>
                            {moviesList.map(m => (<option key={m.id} value={m.id}>{m.title}</option>))}
                        </select>
                    </>
                ) : (
                    <>
                        <label className="font-medium">Series</label>
                        <select className="border border-white p-2 rounded bg-transparent text-white" value={seriesId ?? ''} onChange={(e) => setSeriesId(Number(e.target.value) || null)}>
                            <option value="">Select series</option>
                            {seriesList.map(s => (<option key={s.id} value={s.id}>{s.title}</option>))}
                        </select>
                    </>
                )}

                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">Create Role</button>
                </div>
            </form>
        </section>
    );
}
