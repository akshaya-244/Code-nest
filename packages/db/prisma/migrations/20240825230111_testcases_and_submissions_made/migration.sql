/*
  Warnings:

  - The primary key for the `Submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Submissions` table. All the data in the column will be lost.
  - The primary key for the `TestCases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TestCases` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Submissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Submissions` table without a default value. This is not possible if the table is not empty.
  - Made the column `token` on table `TestCases` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TestCases" DROP CONSTRAINT "TestCases_submissionId_fkey";

-- AlterTable
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_pkey",
DROP COLUMN "id",
ADD COLUMN     "token" VARCHAR NOT NULL,
ADD CONSTRAINT "Submissions_pkey" PRIMARY KEY ("token");

-- AlterTable
ALTER TABLE "TestCases" DROP CONSTRAINT "TestCases_pkey",
DROP COLUMN "id",
ALTER COLUMN "token" SET NOT NULL,
ADD CONSTRAINT "TestCases_pkey" PRIMARY KEY ("token");

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_token_key" ON "Submissions"("token");
