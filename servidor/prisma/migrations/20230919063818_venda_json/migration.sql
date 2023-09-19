/*
  Warnings:

  - Added the required column `nome` to the `VendaItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VendaItem` ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    MODIFY `dados` JSON NULL;
