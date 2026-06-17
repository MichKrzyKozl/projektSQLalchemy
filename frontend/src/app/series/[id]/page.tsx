"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedUser } from "../../../contexts/SelectedUserContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Characters from ".//components/characters";
import SeriesReview from "./components/seriesReview";
import SelectUser from "../../components/selectUser";
import SeriesRatings from ".//components/seriesRatings";
const API_URL = "http://127.0.0.1:8000";

type SeriesType = { id: number; title: string; release_date: any };
type Role = { id: number; character_name: string; actor_id?: number };
type Actor = { id: number; name: string; surname: string };

export default function SeriesPage() {
  const router = useRouter();
  const { id } = useParams();
  const [rating, setRating] = useState(5);
  const [roleRatingsInput, setRoleRatingsInput] = useState<{
    [key: number]: number;
  }>({})
  const [series, setSeries] = useState<SeriesType | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [seriesRating, setSeriesRating] = useState<any>([]);
  const [seriesroleRatings, setSeriesRoleRatings] = useState<any>({});

  const { selectedUserId, setSelectedUserId } = useSelectedUser();

  async function addReview() {

    const res = await axios.post(`${API_URL}/seriesReview`, {
      value: rating,
      user_id: selectedUserId,
      reviewed_id: Number(id)

    });
    console.log(res.data)
    await getSeriesRating()
  }
  async function addRoleReview(roleId: number) {
    const res = await axios.post(`${API_URL}/seriesRoleReview`, {
      value: roleRatingsInput[roleId] || -1,
      user_id: selectedUserId,
      reviewed_id: roleId
    });
    await getAllRoleRatings()
    console.log(res.data);
  }

  async function loadSeries() {
    const res = await axios.get(`${API_URL}/series/${id}`);
    setSeries(res.data);
  }

  async function getRoles() {
    const res = await axios.get(`${API_URL}/seriesroles/${id}`);
    setRoles(res.data);
  }

  async function getActors() {
    const res = await axios.get(`${API_URL}/seriesactors/${id}`);
    setActors(res.data);
  }

  async function getSeriesRating() {
    const res = await axios.get(`${API_URL}/seriesratings/${id}`);
    setSeriesRating(res.data);
  }

  async function getAllRoleRatings() {
    const results: any = {};

    for (const role of roles) {
      const res = await axios.get(`${API_URL}/seriesroleratings/${role.id}`);
      results[role.id] = res.data;
    }

    setSeriesRoleRatings(results);
  }

  async function deleteRating(id: number) {
    await axios.delete(`${API_URL}/seriesRating/${id}`);
    await getSeriesRating()

  }

  useEffect(() => {
    loadSeries()
    getRoles()
    getActors()
    getSeriesRating()
  }, [id]);

  useEffect(() => {
    if (roles.length > 0) {
      getAllRoleRatings();
    }
  }, [roles]);

  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

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

  if (!series) {
    return <div className="p-10">ładowanie...</div>;
  }

  return (
    <div className="p-10">
      <div onClick={() => router.push(`/`)}
      > Strona głowna </div>
      <h1 className="text-3xl font-bold">{series.title}</h1>
      <SelectUser
        selectedUserId={selectedUserId}
        selectedUserName={selectedUserName}
        setSelectedUserId={setSelectedUserId} />

      <p>Data wydania: {series.release_date}</p>

      <Characters
        roles={roles}
        actors={actors}
        movieroleRatings={seriesroleRatings}
        roleRatingsInput={roleRatingsInput}
        setRoleRatingsInput={setRoleRatingsInput}
        addRoleReview={addRoleReview}
      />
      <SeriesReview
        rating={rating}
        setRating={setRating}
        addReview={addReview} />

      <SeriesRatings
        seriesRating={seriesRating}
        deleteRating={deleteRating} />
    </div>
  );
}
