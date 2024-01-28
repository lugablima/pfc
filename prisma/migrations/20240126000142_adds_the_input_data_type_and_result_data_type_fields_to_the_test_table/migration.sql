/*
  Warnings:

  - Added the required column `inputDataType` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultDataType` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "inputDataType" TEXT NOT NULL,
ADD COLUMN     "resultDataType" TEXT NOT NULL;
