import { getFolder, getFolders } from "#db/queries/folders";
import express from "express";
const foldersRouter = express.Router();
export default foldersRouter;

foldersRouter.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

foldersRouter.get("/:id", async (req, res) => {
  try {
    const folderId = req.params.id;
    const folders = await getFolder(folderId);
    res.send(folders);
  } catch (err) {
    console.log(err.message);
    res.status(404).send({ error: err.message });
  }
});

foldersRouter.get("/:id/files", async (req, res) => {
  res.send();
});
