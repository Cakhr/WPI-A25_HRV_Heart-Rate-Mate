import { int, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const measurementCaptures = sqliteTable('measurement_captures_table', {
  captureId: int().primaryKey({ autoIncrement: true }).unique(),
  // W x H, ex: '480x640' or '1080x1920'
  captureResolution: text().notNull(),
  // will be in milliseconds
  captureDuration: int()
});

export const measurements = sqliteTable('measurements_table', {
  captureId: int()
    .references(() => measurementCaptures.captureId)
    .unique(),
  id: int().primaryKey({ autoIncrement: true }),
  red: int().notNull(),
  green: int().notNull(),
  blue: int().notNull(),
  alpha: int().notNull(),
  avgRed: numeric().notNull(),
  avgGreen: numeric().notNull()
});
