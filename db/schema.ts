import { sql } from 'drizzle-orm';
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const measurementSessions = sqliteTable('measurement_sessions_table', {
  // Pk and used as foreign key on measurements table
  captureId: int().primaryKey({ autoIncrement: true }).unique(),
  // when capture was logged to db, they're immutable so no need for updatedAt column
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(current_timestamp)`),
  // W x H, ex: '480x640' or '1080x1920'
  resolution: text().notNull(),
  // capture duration (ms)
  duration: int().notNull(),
  // if this capture has been analyzed yet
  analyzed: int({ mode: 'boolean' }).default(false)
});

export const measurements = sqliteTable('measurements_table', {
  // Fk from measurementSessions, on update/delete cascade, really shouldn't ever need to be updated
  captureId: int()
    .references(() => measurementSessions.captureId, {
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
    .notNull(),
  id: int().primaryKey({ autoIncrement: true }),
  avgRed: real().notNull(),
  avgGreen: real().notNull(),
  avgBlue: real().notNull(),
  // Corresponds to ms that have elapsed in current second, used to find time elapsed between measurements (SSS)
  ms: int().notNull()
});

export const customBreathingPresets = sqliteTable(
  'custom_breathing_presets_table',
  {
    id: int().primaryKey({ autoIncrement: true }).unique(),
    createdAt: text('createdAt')
      .notNull()
      .default(sql`(current_timestamp)`),
    // should (theoretically) update updatedAt whenever the row is altered
    updatedAt: text('updatedAt')
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
    breathIn: real().notNull().default(4.8), // in seconds
    breathOut: real().notNull().default(4.8), // ditto ^
    duration: real().notNull().default(2.0) // in minutes
  }
);

export const journalEntries = sqliteTable('journal_entries_table', {
  id: int().primaryKey({ autoIncrement: true }).unique(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  // Likely a better way to store these than just as text, but didn't want to work with file IO and potentially encryption
  title: text().notNull().default('Default title'),
  description: text().notNull().default('Default description'),
  entry: text().notNull().default('Default journal entry')
});

// This could be amended in the future to reference another table customJournalCategories
export const customJournalPrompts = sqliteTable(
  'custom_journal_prompts_table',
  {
    id: int().primaryKey({ autoIncrement: true }).unique(),
    createdAt: text('createdAt')
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: text('updatedAt')
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
    // Likely a better way to store these than just as text, but didn't want to work with file IO and potentially encryption
    title: text().notNull().default('Default title'),
    description: text().notNull().default('Default journal entry')
  }
);

export const settings = sqliteTable('settings_table', {
  firstTimeSetup: int({ mode: 'boolean' }).default(false), // user has completed first time setup
  userName: text().default('User') // user's name
});

// stores the results of the fourier transform of a given capture, with measurementID corresponding to a measurement
export const measurementsFourier = sqliteTable('measurements_fourier_table', {
  captureId: int()
    .references(() => measurementSessions.captureId)
    .notNull(),
  id: int()
    .primaryKey()
    .references(() => measurements.id)
    .notNull(),
  red: int().notNull(),
  green: int().notNull(),
  blue: int().notNull(),
  ms: int().notNull()
});
