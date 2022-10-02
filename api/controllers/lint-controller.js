const { Router } = require("express");
const lint = require("solhint");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export class LintController {
  path;
  router;

  constructor() {
    this.path = "";
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Post api/fileAudit
    this.router.post(
      `${this.path}/fileAudit`,
      upload.single("file"),
      (req, res) => {
        const file = req.file;
        // const fileBuffer = file.buffer.toString("utf-8");

        const lintConfig = {
          extends: "solhint:recommended",
          plugins: [],
          rules: {
            "avoid-suicide": "error",
            "avoid-sha3": "warn",
            "no-unused-vars": "error",
          },
        };

        const result = lint.processStr(
          file.buffer.toString(),
          lintConfig,
          file.originalname
        );
        res.send(result);
      }
    );

    // Post api/textAudit
    this.router.post(`${this.path}/textAudit`, (req, res) => {
      var solidityCode = req.body.solCode;

      const lintConfig = {
        extends: "solhint:recommended",
        plugins: [],
        rules: {
          "avoid-suicide": "error",
          "avoid-sha3": "warn",
          "no-unused-vars": "error",
        },
      };

      const result = lint.processStr(solidityCode, lintConfig);
      res.send(result);
    });
  }
}
