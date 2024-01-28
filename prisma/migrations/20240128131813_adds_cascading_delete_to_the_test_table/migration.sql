-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
