import express from "express";
import auth from "../../middleware/auth"
import { deleteUrl, getAllUrl, getUrl, postUrl, putUrl } from "./url.service";

/**
 * Url Router Definition
 */

export const urlRouter = express.Router();

urlRouter.get("/", auth, getAllUrl);
urlRouter.delete('/:id', auth, deleteUrl);
urlRouter.put('/:id', auth, putUrl);
urlRouter.post("/", postUrl);
urlRouter.get("/:code", getUrl); 