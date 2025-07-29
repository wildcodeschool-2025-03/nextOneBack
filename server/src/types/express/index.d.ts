import type { File } from "multer";
import type { MyPayload } from "../../middlewares/verifyToken";

declare global {
  namespace Express {
    export interface Request {
      auth: MyPayload;
      file?: File;
      files?: File[];
    }
  }
}
