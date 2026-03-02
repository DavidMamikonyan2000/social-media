import "dotenv/config";
import express from "express";
import helmet from "helmet";
import corsOptions from "./config/cors.js";
import path from "path";
import morgan from "morgan";
import limiter from "./middlewares/rateLimiter.js";
import { __dirname } from "./config/path.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(corsOptions);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/api", limiter);
app.use(errorHandler);

export default app;
