"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedUser } from "../../../contexts/SelectedUserContext";
import { useParams } from "next/navigation";
import ActorMovies from "./components/actorMovies";
import ActorReview from "./components/actorRevievs";
import ActorRating from "./components/actorRatings";
import { useRouter } from "next/navigation";
import SelectUser from "@/app/components/selectUser";
import ActorSeries from "./components/actorSeries";

const API_URL = "http://127.0.0.1:8000";

type Movie = { id: number; title: string };
type Role = { id: number; character_name: string; actor_id?: number };
type Actor = { id: number; name: string; surname: string,date_of_birth:any };
type ActorMovie = { movie_id: number; title: string; role_id: number; character_name: string; avg_rating?: number | null };


export default function ActorPage() {
  const router = useRouter();
  const { id } = useParams();
  const [actor, setActor] = useState<Actor | null>(null);
  const [rating, setRating] = useState<any>(0)
  const [actorRating, setActorRating] = useState<any[]>([]);
  const [actorMovies, setActorMovies] = useState<ActorMovie[] | null>(null)
  const [actorSeries, setActorSeries] = useState<any[] | null>(null)
  const { selectedUserId, setSelectedUserId } = useSelectedUser();
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  async function addReview() {

    try {
      const res = await axios.post(`${API_URL}/actorReview`, {
        value: rating,
        user_id: selectedUserId,
        reviewed_id: Number(id)
      });
      console.log(res.data);
      await getActorRating();
    } catch (e) {
      console.error(e);
    }

  }

  async function loadActor() {
    const res = await axios.get(`${API_URL}/actors/${id}`);
    setActor(res.data);
  }
  async function getActorMovies() {
    try {
      const res = await axios.get(`${API_URL}/actorMovies/${id}`);
      setActorMovies(res.data || []);
    } catch (e) {
      setActorMovies([]);
    }
  }
  async function getActorSeries() {
    try {
      const res = await axios.get(`${API_URL}/actorSeries/${id}`);
      setActorSeries(res.data || []);
    } catch (e) {
      setActorSeries([]);
    }
  }
  async function getActorRating() {
    const res = await axios.get(`${API_URL}/actorratings/${id}`)
    console.log(res)
    console.log(res.data)
    setActorRating(res.data)
  }

  useEffect(() => {
    if (!id) return;
    loadActor();
    getActorMovies();
    getActorRating();
    getActorSeries();
  }, [id]);



  useEffect(() => {
    let mounted = true;
    if (!selectedUserId) {
      setSelectedUserName(null);
      return;
    }

    (async () => {
      try {
        const res = await axios.get(`${API_URL}/users/${selectedUserId}`);
        if (mounted) setSelectedUserName(res.data?.name ?? String(selectedUserId));
      } catch (e) {
        if (mounted) setSelectedUserName(String(selectedUserId));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [selectedUserId]);
   async function deleteRating(id: number)
    {
        await axios.delete(`${API_URL}/actorRating/${id}`);
        await getActorRating()
        
    }

  if (!actor) {
    return <div className="p-10">ładowanie...</div>;
  }

  return (

    <div className="p-10">
      <div onClick={() => router.push(`/`)}> Strona głowna </div>
            <SelectUser
              selectedUserId={selectedUserId}
              selectedUserName={selectedUserName}
              setSelectedUserId={setSelectedUserId} />
      <h1 className="text-3xl font-bold">{actor.name} {actor.surname}</h1>
      <p>Rok urodzenia: {actor.date_of_birth}</p>
      <ActorMovies
        actorMovies={actorMovies}
      />
      <ActorSeries 
      actorSeries ={actorSeries}/>

      <ActorRating
        actorRating={actorRating}
        deleteRating={deleteRating} />
      <div>
        <ActorReview
          rating={rating}
          setRating={setRating}
          addReview={addReview} />
      </div>

    </div>
  );
}