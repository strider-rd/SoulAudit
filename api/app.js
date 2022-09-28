import express from "express";
const app = express();
const cors = require("cors");
const lint = require("solhint");

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
app.get("/api", (_req, res) => {
  res.send("Hello From API");
});

app.post("/api/fileAudit", upload.single("file"), (req, res) => {
  const file = req.file;
  // const fileBuffer = file.buffer.toString("utf-8");
  const lintConfig = {
    extends: "solhint:recommended",
    plugins: [],
    rules: {
      "avoid-suicide": "error",
      "avoid-sha3": "warn",
    },
  };
  const result = lint.processStr(
    file.buffer.toString(),
    lintConfig,
    file.originalname
  );
  res.send(result.reports);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
