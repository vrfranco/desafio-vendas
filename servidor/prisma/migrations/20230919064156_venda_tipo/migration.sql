/*
  Warnings:

  - Added the required column `tipo` to the `VendaItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VendaItem` ADD COLUMN `tipo` ENUM('Simples', 'Configuravel', 'Agrupado', 'Digital') NOT NULL;
