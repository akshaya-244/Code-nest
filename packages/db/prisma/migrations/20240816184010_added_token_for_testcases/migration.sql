/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `TestCases` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TestCases" ADD COLUMN     "token" VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "TestCases_token_key" ON "TestCases"("token");
