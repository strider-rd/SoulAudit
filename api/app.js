import express from "express";
const app = express();
const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const port = 8000;

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// endpoints
app.get("/api", (req, res) => {
  res.send("Hello From API");
});

app.post("/api/fileAudit", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileBuffer = file.buffer.toString("utf-8");
  res.send(fileBuffer);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
