import client from "../../../database/client";

import type { Result } from "../../../database/client";

export type Connexion = {
  id: number;
  firstname: string;
  name: string;
  email: string;
  pseudo: string;
  password: string;
  id_role: number;
};

export async function userEmail(email: string): Promise<Connexion | null> {
  const [rows] = await client.query("SELECT * FROM User WHERE email = ?", [
    email,
  ]);
  const user = rows as Connexion[];
  return user.length ? user[0] : null;
}

export async function userPseudo(pseudo: string): Promise<Connexion | null> {
  const [rows] = await client.query("SELECT * FROM User WHERE pseudo = ?", [
    pseudo,
  ]);
  const user = rows as Connexion[];
  return user.length ? user[0] : null;
}

export async function userCreate(
  firstname: string,
  name: string,
  pseudo: string,
  email: string,
  password: string,
): Promise<Connexion> {
  const [result] = await client.query<Result>(
    "INSERT INTO User (firstname, name, pseudo, email, password, id_role) VALUES (?, ?, ?, ?, ?, 1)",
    [firstname, name, pseudo, email, password],
  );

  const [rows] = await client.query("SELECT * from User WHERE id = ?", [
    result.insertId,
  ]);
  return (rows as Connexion[])[0];
}
