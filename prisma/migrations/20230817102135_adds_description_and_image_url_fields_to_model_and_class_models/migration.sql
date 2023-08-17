/*
  Warnings:

  - Added the required column `imageUrl` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
