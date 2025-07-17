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
): Promise<boolean> {
  try {
    const [result] = await client.query<ResultSetHeader>(
      "UPDATE Tarifs SET price = ? WHERE id = ?",
      [newPrice, id],
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error("erreur lors de la mise a jour du tarif");
  }
}
