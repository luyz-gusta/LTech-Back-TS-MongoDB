import multer, { StorageEngine } from "multer";
import { Request } from "express";

const multerStorage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file, cb) => {
    cb(null, "./ltech/");
  },
  filename: (_req: Request, file, cb) => {
    const mimetypeParts = file.mimetype.split("/");
    const ext = mimetypeParts.length > 1 ? mimetypeParts[1] : "jpg";

    cb(null, `${Date.now()}.${ext}`);
  },
});

export const upload = multer({ storage: multerStorage });
