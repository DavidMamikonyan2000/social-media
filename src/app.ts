import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import corsOptions from "./config/cors.js";
import path from "path";
import morgan from "morgan";
import limiter from "./middlewares/rateLimiter.js";
import { __dirname } from "./config/path.js";
import router from "./routes/index.js";

const app = express();

// 1. Security first
app.use(helmet());
app.use(corsOptions);

// 2. Logging
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// 3. Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. File uploads (writes to OS temp dir)
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// 4. Static files
app.use(express.static(path.join(__dirname, "public")));

// 5. API routes with rate limiting
app.use("/api", limiter);
app.use("/api", router);

export default app;
