/*
  Warnings:

  - Added the required column `code` to the `Submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `TestCases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_code` to the `TestCases` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubmissionResult" AS ENUM ('AC', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TestCases" ADD COLUMN     "languageId" TEXT NOT NULL,
ADD COLUMN     "source_code" TEXT NOT NULL;
