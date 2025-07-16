import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../../database/client";

export type Tarif = {
  id: number;
  title: string;
  subtitle: string | null;
  price: number;
};

export async function getTarifs(): Promise<Tarif[]> {
  const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM Tarifs");
  return rows as Tarif[];
}

export async function updateTarif(
  id: number,
  newPrice: number,
): Promise<Tarif | null> {
  try {
    const [result] = await client.query<ResultSetHeader>(
      "UPDATE Tarifs SET price = ? WHERE id = ?",
      [newPrice, id],
    );
    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await client.query<RowDataPacket[]>(
      "SELECT * FROM Tarifs WHERE id = ?",
      [id],
    );
    return rows[0] as Tarif;
  } catch (err) {
    throw new Error("erreur lors de la mise a jour du tarif");
  }
}
