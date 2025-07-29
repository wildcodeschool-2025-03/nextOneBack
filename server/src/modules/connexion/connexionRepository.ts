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
  deleted_at: Date | null;
};

// recupére l'utilisateur par l'email
export async function userEmail(email: string): Promise<Connexion | null> {
  const [rows] = await client.query("SELECT * FROM User WHERE email = ?", [
    email,
  ]);
  const user = rows as Connexion[];
  return user.length ? user[0] : null;
}

// recupére l'utilisateur par le pseudo
export async function userPseudo(pseudo: string): Promise<Connexion | null> {
  const [rows] = await client.query(
    "SELECT * FROM User WHERE pseudo = ? AND deleted_at IS NULL",
    [pseudo],
  );
  const user = rows as Connexion[];
  return user.length ? user[0] : null;
}

// recupére l'utilisateur par l'id
export async function userById(userId: number): Promise<Connexion | null> {
  const [rows] = await client.query("SELECT * FROM User WHERE id = ?", [
    userId,
  ]);
  const user = rows as Connexion[];
  return user.length ? user[0] : null;
}

// creation de l'utilisateur
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
// suppression de l'utilisateur
export async function deleteUser(userId: number) {
  return client.query(
    "UPDATE User SET deleted_at = NOW(), registration = NULL WHERE id = ?",
    [userId],
  );
}

export async function connectedUser(email: string) {
  return client.query("UPDATE User SET registration = true WHERE email = ?", [
    email,
  ]);
}
export async function disconnectedUser(email: string) {
  return client.query("UPDATE User SET registration = false WHERE email = ?", [
    email,
  ]);
}
