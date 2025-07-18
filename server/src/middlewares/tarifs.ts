import type { NextFunction, Request, Response } from "express";

export function validTarif(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { id } = req.params;
  const { price } = req.body;

  if (!id || Number.isNaN(Number(id))) {
    res.status(400).json({ error: "id invalide" });
    return;
  }

  if (!price || Number.isNaN(Number(price)) || Number(price) < 0) {
    res.status(400).json({ error: "prix invalide" });
    return;
  }
  next();
}
