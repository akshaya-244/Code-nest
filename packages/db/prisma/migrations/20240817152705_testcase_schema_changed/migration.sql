/*
  Warnings:

  - You are about to drop the column `languageId` on the `TestCases` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TestCases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestCases" DROP CONSTRAINT "TestCases_submissionId_fkey";

-- AlterTable
ALTER TABLE "TestCases" DROP COLUMN "languageId",
DROP COLUMN "status",
ADD COLUMN     "additional_files" BYTEA,
ADD COLUMN     "callback_url" VARCHAR,
ADD COLUMN     "command_line_arguments" VARCHAR,
ADD COLUMN     "compile_output" TEXT,
ADD COLUMN     "compiler_options" VARCHAR,
ADD COLUMN     "cpu_extra_time" DECIMAL,
ADD COLUMN     "cpu_time_limit" DECIMAL,
ADD COLUMN     "created_at" TIMESTAMP(6),
ADD COLUMN     "enable_network" BOOLEAN,
ADD COLUMN     "enable_per_process_and_thread_memory_limit" BOOLEAN,
ADD COLUMN     "enable_per_process_and_thread_time_limit" BOOLEAN,
ADD COLUMN     "exit_code" INTEGER,
ADD COLUMN     "exit_signal" INTEGER,
ADD COLUMN     "expected_output" TEXT,
ADD COLUMN     "finished_at" TIMESTAMP(6),
ADD COLUMN     "language_id" INTEGER,
ADD COLUMN     "max_file_size" INTEGER,
ADD COLUMN     "max_processes_and_or_threads" INTEGER,
ADD COLUMN     "memory_limit" INTEGER,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "number_of_runs" INTEGER,
ADD COLUMN     "redirect_stderr_to_stdout" BOOLEAN,
ADD COLUMN     "stack_limit" INTEGER,
ADD COLUMN     "status_id" INTEGER,
ADD COLUMN     "stderr" TEXT,
ADD COLUMN     "stdin" TEXT,
ADD COLUMN     "stdout" TEXT,
ADD COLUMN     "wall_time" DECIMAL,
ADD COLUMN     "wall_time_limit" DECIMAL,
ALTER COLUMN "submissionId" DROP NOT NULL,
ALTER COLUMN "source_code" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
