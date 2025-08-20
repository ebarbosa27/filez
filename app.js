import express from "express";
import filesRouter from "./api/files.js";
const app = express();
export default app;

app.use(express.json());
app.use("/files", filesRouter);

app.get("/", (req, res) => {
  res.send("Just making files 'n folders.");
});
