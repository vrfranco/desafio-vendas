/*
  Warnings:

  - You are about to alter the column `valorTotal` on the `Venda` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `valorTotal` on the `VendaItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `valorUnitario` on the `VendaItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Venda` MODIFY `valorTotal` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `VendaItem` MODIFY `valorTotal` DECIMAL(10, 2) NOT NULL,
    MODIFY `valorUnitario` DECIMAL(10, 2) NOT NULL;
