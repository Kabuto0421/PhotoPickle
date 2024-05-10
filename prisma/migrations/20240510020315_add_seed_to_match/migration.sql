/*
  Warnings:

  - You are about to drop the column `seed` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `seed` on the `MatchPin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "seed",
ADD COLUMN     "Seed" TEXT;

-- AlterTable
ALTER TABLE "MatchPin" DROP COLUMN "seed";
