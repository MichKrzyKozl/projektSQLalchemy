"use client";

type Props = {
  selectedUserId: number | null;
  selectedUserName: string | null;
  setSelectedUserId: (id: number | null) => void;
};

export default function SelectUser({selectedUserId, selectedUserName, setSelectedUserId} :Props){
    return (
          <div className="my-4">
        <span>Wybrany użytkownik: </span>
        {selectedUserId ? (
          <span className="ml-2">{selectedUserName ?? selectedUserId} <button className="ml-4 text-sm text-red-500" onClick={() => setSelectedUserId(null)}>Usuń</button></span>
        ) : (
          <span className="ml-2 text-gray-500">(Nie wybrano użytkownika)</span>
        )}
      </div>
    )
}
