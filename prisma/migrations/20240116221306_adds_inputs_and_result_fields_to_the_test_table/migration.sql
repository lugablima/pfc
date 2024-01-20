/*
  Warnings:

  - You are about to drop the column `tests` on the `tests` table. All the data in the column will be lost.
  - Added the required column `inputs` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" DROP COLUMN "tests",
ADD COLUMN     "inputs" JSONB NOT NULL,
ADD COLUMN     "result" JSONB NOT NULL;
