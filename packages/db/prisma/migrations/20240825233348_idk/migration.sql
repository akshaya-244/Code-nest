/*
  Warnings:

  - The primary key for the `Submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_pkey";
