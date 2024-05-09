/*
  Warnings:

  - You are about to drop the column `Seed` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "Seed",
ADD COLUMN     "seed" INTEGER;

-- AlterTable
ALTER TABLE "MatchPin" ADD COLUMN     "seed" INTEGER;
