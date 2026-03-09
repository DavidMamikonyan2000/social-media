import "reflect-metadata";
import "dotenv/config";
import "./config/redis.js";

import http from "http";
import app from "./app.js";
import { AppDataSource } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected ✅");

    await AppDataSource.runMigrations();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });

    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use`);
      } else {
        console.error("Server error:", error.message);
      }
      process.exit(1);
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down gracefully...");
      server.close(() => process.exit(0));
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received. Shutting down gracefully...");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("DB Error ❌", error);
    process.exit(1);
  }
}

bootstrap();
