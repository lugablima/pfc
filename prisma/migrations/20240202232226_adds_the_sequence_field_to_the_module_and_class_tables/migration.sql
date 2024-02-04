/*
  Warnings:

  - A unique constraint covering the columns `[sequence,moduleId]` on the table `classes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sequence]` on the table `modules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sequence` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sequence` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "sequence" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "sequence" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "classes_sequence_moduleId_key" ON "classes"("sequence", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "modules_sequence_key" ON "modules"("sequence");
