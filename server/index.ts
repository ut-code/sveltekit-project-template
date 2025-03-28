import { Hono } from "hono";
import hello from "./routes/hello.ts";

const app = new Hono().basePath("/api").route("/hello", hello);

export default app;
export type App = typeof app;
