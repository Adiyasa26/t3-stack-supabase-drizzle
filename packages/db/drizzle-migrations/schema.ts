import { pgTable, pgEnum, serial, varchar, timestamp } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const post = pgTable("post", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	content: varchar("content", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow(),
});