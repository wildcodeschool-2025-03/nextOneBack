import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import type { User } from "../types/auth";

type ChildrenType = {
  children: React.ReactNode;
};

type LoginContextType = {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  logout: () => void;
  isAdmin: boolean;
};

export const LoginContext = createContext<LoginContextType | null>(null);

export function LoginProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<User | null | undefined>(null);

  const isAdmin = user?.id_role === 2;

  const login = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/connexion/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser({
          id: res.data.userId,
          email: res.data.email,
          pseudo: res.data.pseudo,
          firstname: res.data.firstname,
          name: res.data.name,
          id_role: res.data.id_role,
        });
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    login();
  }, [login]);

  const logout = useCallback(() => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/connexion/logout`,
        {},
        { withCredentials: true },
      )
      .then(() => setUser(null))
      .catch(() => console.error("erreur de déconnexion"));
  }, []);

  return (
    <LoginContext.Provider value={{ user, setUser, logout, isAdmin }}>
      {children}
    </LoginContext.Provider>
  );
}
