-- DropForeignKey
ALTER TABLE "Adventure" DROP CONSTRAINT "Adventure_systemId_fkey";

-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_systemId_fkey";

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE CASCADE ON UPDATE CASCADE;
