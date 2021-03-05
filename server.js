import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, "dist");

app.use(express.static(DIST_DIR));

app.get("/", (req, res) => {
  const HTML_FILE = path.join(__dirname, "dist", "index.html");
  res.sendFile(HTML_FILE);
});

app.listen(PORT, () => {
  console.log("server is running");
});
