import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.get("/", (req, res) => {
  const HTML_FILE = path.join(__dirname, "dist", "index.html");
  res.sendFile(HTML_FILE);
});
