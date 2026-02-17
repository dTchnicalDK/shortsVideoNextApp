/*
  Warnings:

  - Added the required column `video` to the `Shorts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shorts" ADD COLUMN     "video" TEXT NOT NULL;
