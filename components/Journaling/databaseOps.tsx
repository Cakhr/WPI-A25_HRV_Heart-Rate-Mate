import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { journalEntries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Journal } from './JournalEntry';
import { JournalWithId } from '@/app/(pages)/journaling/existingJournal';

// can be used to insert or update a row by id
export async function insertJournalEntry(
  journal: Journal,
  entryId?: number
): Promise<void> {
  const expo = SQLite.openDatabaseSync('db.db');
  const db = drizzle(expo);

  if (entryId) {
    const entry = await db
      .update(journalEntries)
      .set(journal)
      .where(eq(journalEntries.id, entryId))
      .returning()
      .get();
    console.log(
      `Successfully updated journal entry, id: ${entry.id}, updatedAt: ${entry.updatedAt}`
    );
  } else {
    const entry = await db
      .insert(journalEntries)
      .values(journal)
      .returning()
      .get();
    console.log(`Successfully inserted journal entry, id: ${entry.id}`);
  }
}

// delete a row by id
export async function deleteJournalEntry(entryId: number): Promise<void> {
  const expo = SQLite.openDatabaseSync('db.db');
  const db = drizzle(expo);

  await db.delete(journalEntries).where(eq(journalEntries.id, entryId));
  console.log(`Deleted Journal entry id: ${entryId}`);
}

// fetch all Journal entries and assign them using a passed useState setter
export async function fetchJournalEntries(
  setJournalEntries: (entries: JournalWithId[]) => void
): Promise<void> {
  const expo = SQLite.openDatabaseSync('db.db');
  const db = drizzle(expo);

  const entries = (await db.select().from(journalEntries)).reverse();
  setJournalEntries(entries);
}
