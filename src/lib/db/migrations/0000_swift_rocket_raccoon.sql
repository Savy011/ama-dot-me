CREATE TABLE `question` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL,
	`answer` text,
	`askedAt` integer NOT NULL,
	`answeredAt` integer,
	`published` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX `published_idx` ON `question` (`published`);