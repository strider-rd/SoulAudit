import { App } from "./app";
import { LintController } from "./controllers/lint-controller";

const app = new App(8000, [new LintController()]);
app.listen();
