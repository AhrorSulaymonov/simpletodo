/*
  Warnings:

  - You are about to drop the column `isdelete` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isdelete",
ADD COLUMN     "isdeleted" BOOLEAN NOT NULL DEFAULT false;
