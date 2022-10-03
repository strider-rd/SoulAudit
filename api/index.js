import App from "./app.js";
import LintController from "./controllers/lint-controller.js";

const app = new App(8000, [new LintController()]);
app.listen();
