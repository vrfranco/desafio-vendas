/*
  Warnings:

  - Added the required column `quantidade` to the `VendaItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VendaItem` ADD COLUMN `quantidade` INTEGER NOT NULL;
