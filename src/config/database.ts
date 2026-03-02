import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, "../entities/*.{ts,js}")],
  migrations: [path.join(__dirname, "../migrations/*.{ts,js}")],
});
