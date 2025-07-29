import fs from "node:fs";
import path from "node:path";
import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

// Crée le dossier s’il n’existe pas
const destination = path.resolve(__dirname, "../../public/assets/images/games");
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, destination);
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/\s+/g, "_");
    cb(null, `${timestamp}-${sanitized}`);
  },
});

// Filtrage des fichiers : uniquement les images
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
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
    fileSize: 5 * 1024 * 1024, // 5 Mo
  },
});

export const uploadGameImage = upload.single("image");
