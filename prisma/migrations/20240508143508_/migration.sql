/*
  Warnings:

  - You are about to drop the column `pin` on the `MatchPin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Seed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MatchPin" DROP COLUMN "pin",
ADD COLUMN     "takePhoto" TEXT,
ADD COLUMN     "targetImage" TEXT,
ADD COLUMN     "visited" BOOLEAN,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
