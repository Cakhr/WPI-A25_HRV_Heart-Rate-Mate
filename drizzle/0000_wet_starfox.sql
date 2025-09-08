CREATE TABLE `measurement_captures_table` (
	`captureId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`captureResolution` text NOT NULL,
	`captureDuration` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `measurement_captures_table_captureId_unique` ON `measurement_captures_table` (`captureId`);--> statement-breakpoint
CREATE TABLE `measurements_table` (
	`captureId` integer,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`red` integer NOT NULL,
	`green` integer NOT NULL,
	`blue` integer NOT NULL,
	`alpha` integer NOT NULL,
	`avgRed` numeric NOT NULL,
	`avgGreen` numeric NOT NULL,
	FOREIGN KEY (`captureId`) REFERENCES `measurement_captures_table`(`captureId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `measurements_table_captureId_unique` ON `measurements_table` (`captureId`);