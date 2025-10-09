CREATE TABLE `custom_breathing_presets_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	`breathIn` real DEFAULT 4.8 NOT NULL,
	`breathOut` real DEFAULT 4.8 NOT NULL,
	`duration` real DEFAULT 2 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `custom_breathing_presets_table_id_unique` ON `custom_breathing_presets_table` (`id`);--> statement-breakpoint
CREATE TABLE `custom_journal_prompts_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	`title` text DEFAULT 'Default title' NOT NULL,
	`description` text DEFAULT 'Default journal entry' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `custom_journal_prompts_table_id_unique` ON `custom_journal_prompts_table` (`id`);--> statement-breakpoint
CREATE TABLE `journal_entries_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	`title` text DEFAULT 'Default title' NOT NULL,
	`description` text DEFAULT 'Default description' NOT NULL,
	`entry` text DEFAULT 'Default journal entry' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `journal_entries_table_id_unique` ON `journal_entries_table` (`id`);--> statement-breakpoint
CREATE TABLE `measurement_sessions_table` (
	`captureId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`resolution` text NOT NULL,
	`duration` integer NOT NULL,
	`analyzed` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `measurement_sessions_table_captureId_unique` ON `measurement_sessions_table` (`captureId`);--> statement-breakpoint
CREATE TABLE `measurements_table` (
	`captureId` integer NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`avgRed` real NOT NULL,
	`avgGreen` real NOT NULL,
	`avgBlue` real NOT NULL,
	`ms` integer NOT NULL,
	FOREIGN KEY (`captureId`) REFERENCES `measurement_sessions_table`(`captureId`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `measurements_fourier_table` (
	`captureId` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`red` integer NOT NULL,
	`green` integer NOT NULL,
	`blue` integer NOT NULL,
	`ms` integer NOT NULL,
	FOREIGN KEY (`captureId`) REFERENCES `measurement_sessions_table`(`captureId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id`) REFERENCES `measurements_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `settings_table` (
	`firstTimeSetup` integer DEFAULT false,
	`userName` text DEFAULT 'User'
);
