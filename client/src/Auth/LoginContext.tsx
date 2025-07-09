import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import type { User } from "../types/auth";

type ChildrenType = {
  children: React.ReactNode;
};

type LoginContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  auth: () => void;
  logout: () => void;
};

export const loginContext = createContext<LoginContextType | null>(null);

export function LoginProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<User | null>(null);

  const auth = useCallback(() => {
    axios
      .get("/api/me", { withCredentials: true })
      .then((response) => setUser(response.data.user))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    auth();
  }, [auth]);

  const logout = useCallback(() => {
    axios
      .post("/api/logout", {}, { withCredentials: true })
      .then(() => setUser(null));
  }, []);
  return (
    <loginContext.Provider value={{ user, setUser, auth, logout }}>
      {children}
    </loginContext.Provider>
  );
}
