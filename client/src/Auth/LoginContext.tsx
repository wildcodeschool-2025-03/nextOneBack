import { createContext, useCallback, useEffect, useState } from "react";
import client from "../services/client";
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
    client
      .get("/connexion/profile")
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
    client
      .post("/connexion/logout")
      .then(() => setUser(null))
      .catch(() => console.error("erreur de déconnexion"));
  }, []);

  return (
    <LoginContext.Provider value={{ user, setUser, logout, isAdmin }}>
      {children}
    </LoginContext.Provider>
  );
}
