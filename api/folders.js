import { addFileToFolder, getFolder, getFolders } from "#db/queries/folders";
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

foldersRouter.post("/:id/files", async (req, res) => {
  try {
    const folderId = req.params.id;
    const file = req.body;

    if (file === undefined) {
      throw Error("No body provided!");
    }
    if (file.name === undefined || file.size === undefined) {
      throw Error("Parameter in body is missing!");
    }

    const result = await addFileToFolder(folderId, file);
    res.status(201).send(result);
  } catch (err) {
    if (err.code === "23503") {
      res.status(404).send({ error: "Folder does not exist!" });
    }
    res.status(400).send({ error: err.message });
  }
});
