import express from "express";
import filesRouter from "./api/files.js";
import foldersRouter from "#api/folders";
const app = express();
export default app;

app.use(express.json());
app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

app.get("/", (req, res) => {
  res.send("Just making files 'n folders.");
});
