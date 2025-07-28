import path from "node:path";
import type { Request } from "express";
import multer from "multer";

// Dossier de destination des images
const destination = path.resolve(__dirname, "../../public/assets/images/games");

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination,
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/\s+/g, "_");
    cb(null, `${timestamp}-${sanitized}`);
  },
});

// Filtrage des fichiers : uniquement les images
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const isImage = /^image\/(jpeg|png|gif|webp|bmp|svg\+xml)$/.test(
    file.mimetype,
  );
  if (isImage) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Type de fichier non supporté. Seules les images sont autorisées.",
      ),
    );
  }
};

// Configuration complète de Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Middleware prêt à l’emploi pour une image unique
export const uploadGameImage = upload.single("image");
