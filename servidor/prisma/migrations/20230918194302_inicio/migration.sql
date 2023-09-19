/*
  Warnings:

  - Added the required column `dados` to the `VendaItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Cliente_nome_key` ON `Cliente`;

-- AlterTable
ALTER TABLE `VendaItem` ADD COLUMN `dados` JSON NOT NULL;
