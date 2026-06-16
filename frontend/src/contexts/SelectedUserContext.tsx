"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

type Ctx = {
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
};

const SelectedUserContext = createContext<Ctx>({
  selectedUserId: null,
  setSelectedUserId: () => {},
});

export const SelectedUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
  
      const raw = localStorage.getItem("selectedUserId");
      if (raw) {
        const parsed = Number(raw);
        if (!Number.isNaN(parsed)) setSelectedUserId(parsed);
      }
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      try {
        localStorage.setItem("selectedUserId", String(selectedUserId));
      } catch (e) {}
      api.defaults.headers.common["X-User-Id"] = String(selectedUserId);
    } else {
      try {
        localStorage.removeItem("selectedUserId");
      } catch (e) {}
      delete api.defaults.headers.common["X-User-Id"];
    }
  }, [selectedUserId]);

  return (
    <SelectedUserContext.Provider value={{ selectedUserId, setSelectedUserId }}>
      {children}
    </SelectedUserContext.Provider>
  );
};

export const useSelectedUser = () => useContext(SelectedUserContext);
