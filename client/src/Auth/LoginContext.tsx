import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import client from "../services/client";
import type { User } from "../types/auth";

type ChildrenType = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  logout: () => void;
  isAdmin: boolean;
};

// Contexte renommé pour éviter le conflit avec Vite
export const AuthContext = createContext<AuthContextType | null>(null);

const LoginProvider = ({ children }: ChildrenType) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const isAdmin = user?.id_role === 2;

  const login = useCallback(() => {
    client
      .get("/connexion/profile", { withCredentials: true })
      .then((res) => {
        console.log("PROFILE:", res.data);
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
      .post("/connexion/logout", {}, { withCredentials: true })
      .then(() => setUser(null))
      .catch(() => console.error("Erreur de déconnexion"));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { LoginProvider };
