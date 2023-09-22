import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as post from "./schemas/post";

export const schema = { ...post };

const connectionString = process.env.DATABASE_URL ?? "";
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

export type Database = typeof db;
