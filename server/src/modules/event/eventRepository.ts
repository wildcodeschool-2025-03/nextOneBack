import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../../database/client";

export type Event = {
  id: number;
  title: string;
  description: string | null;
  date: string;
  id_user: number;
  participant_count: number;
};

// récupere tous les events
export async function getEvents(): Promise<Event[]> {
  const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM Event");
  return rows as Event[];
}

// creer un nouvel event
export async function createEvent(
  title: string,
  description: string | null,
  date: string,
  id_user: number,
): Promise<boolean> {
  try {
    const [result] = await client.query<ResultSetHeader>(
      "INSERT INTO Event (title, description, date, id_user) VALUES ( ?, ?, ?, ?) ",
      [title, description, date, id_user],
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error("erreur lors de la création de l'evenement");
  }
}

// modifier un evenement
export async function updateEvent(
  id: number,
  title: string,
  description: string | null,
  date: string,
): Promise<boolean> {
  try {
    const [result] = await client.query<ResultSetHeader>(
      "UPDATE Event SET title = ?, description = ?, date = ? WHERE id = ? ",
      [title, description, date, id],
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error("erreur lors de la modification de l'evenement");
  }
}

// supprimer un event
export async function deleteEvent(id: number): Promise<boolean> {
  try {
    const [result] = await client.query<ResultSetHeader>(
      "DELETE FROM Event WHERE id = ?",
      [id],
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error("erreur lors de la suppression de l'evenement");
  }
}

// inscrire un player à un evenement
export async function participate(
  id_user: number,
  id_event: number,
): Promise<void> {
  await client.query<ResultSetHeader>(
    "INSERT INTO Event_User (id_user, id_event) VALUES (?, ?)",
    [id_user, id_event],
  );
  await client.query<ResultSetHeader>(
    "UPDATE Event Set participant_count = participant_count + 1 WHERE id = ?",
    [id_event],
  );
}

// annuler la participation à un event
export async function cancelParticipate(
  id_user: number,
  id_event: number,
): Promise<void> {
  await client.query<ResultSetHeader>(
    "DELETE FROM Event_User WHERE id_user = ? AND id_event = ?",
    [id_user, id_event],
  );
  await client.query<ResultSetHeader>(
    "UPDATE Event Set participant_count = participant_count - 1 WHERE id = ?",
    [id_event],
  );
}
