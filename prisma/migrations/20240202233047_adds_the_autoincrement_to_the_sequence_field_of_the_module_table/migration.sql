-- AlterTable
CREATE SEQUENCE modules_sequence_seq;
ALTER TABLE "modules" ALTER COLUMN "sequence" SET DEFAULT nextval('modules_sequence_seq');
ALTER SEQUENCE modules_sequence_seq OWNED BY "modules"."sequence";
