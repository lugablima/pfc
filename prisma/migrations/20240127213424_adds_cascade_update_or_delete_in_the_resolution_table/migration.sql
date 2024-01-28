-- DropForeignKey
ALTER TABLE "resolutions" DROP CONSTRAINT "resolutions_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "resolutions" DROP CONSTRAINT "resolutions_userId_fkey";

-- AddForeignKey
ALTER TABLE "resolutions" ADD CONSTRAINT "resolutions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resolutions" ADD CONSTRAINT "resolutions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
