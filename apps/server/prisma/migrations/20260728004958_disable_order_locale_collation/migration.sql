-- This is an empty migration.
ALTER TABLE "Section" ALTER COLUMN "order" TYPE text COLLATE "C";
ALTER TABLE "Ticket" ALTER COLUMN "order" TYPE text COLLATE "C";