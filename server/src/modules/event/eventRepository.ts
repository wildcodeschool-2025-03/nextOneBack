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

export type EventWithParticipants = {
  id: number;
  title: string;
  description: string | null;
  date: string;
  id_user: number;
  participant_count: number;
  participants: {
    id: number;
    pseudo: string;
  }[];
};

// récupere tous les events
export async function getEvents(): Promise<Event[]> {
  const [rows] = await client.query<RowDataPacket[]>(
    `SELECT 
    id, 
    title, 
    description, 
    date, id_user, 
    participant_count 
    FROM Event 
    ORDER BY date ASC`,
  );
  return rows as Event[];
}

// recupére un event par un ID
export async function getEventById(eventId: number): Promise<Event | null> {
  const [rows] = await client.query<RowDataPacket[]>(
    `SELECT     
    id, 
    title, 
    description, 
    date, 
    id_user, 
    participant_count 
    FROM Event  
    WHERE id = ?`,
    [eventId],
  );
  return rows.length > 0 ? (rows[0] as Event) : null;
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
    console.log(err);
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

// verifier si un utilisateur est deja inscrit
export async function userRegister(
  id_user: number,
  id_event: number,
): Promise<boolean> {
  const [rows] = await client.query<RowDataPacket[]>(
    "SELECT 1 FROM Event_User WHERE id_user = ? AND id_event = ?",
    [id_user, id_event],
  );
  return rows.length > 0;
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
    "UPDATE Event SET participant_count = participant_count + 1 WHERE id = ?",
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

// recuperer les pseudos des participants inscrit à un event
export async function getEventWithParticipants(
  eventId: number,
): Promise<EventWithParticipants | null> {
  const event = await getEventById(eventId);
  if (!event) return null;
  const [participantRows] = await client.query<RowDataPacket[]>(
    `SELECT
    u.id,
    u.pseudo
    FROM Event_User eu
    JOIN User u ON eu.id_user = u.id
    WHERE eu.id_event = ?
    ORDER BY u.pseudo ASC`,
    [eventId],
  );
  return {
    ...event,
    participants: participantRows as { id: number; pseudo: string }[],
  };
}
