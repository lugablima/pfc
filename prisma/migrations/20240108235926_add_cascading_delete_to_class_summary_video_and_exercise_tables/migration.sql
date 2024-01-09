-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_classId_fkey";

-- DropForeignKey
ALTER TABLE "summaries" DROP CONSTRAINT "summaries_classId_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_classId_fkey";

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
