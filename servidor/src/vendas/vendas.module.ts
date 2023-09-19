import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasRepository } from './vendas.repository';
import { VendasController } from './vendas.controller';
import { PrismaService } from 'src/prisma.service';
import { ProdutosRepository } from 'src/produtos/produtos.repository';

@Module({
  controllers: [VendasController],
  providers: [
    ProdutosRepository,
    VendasRepository,
    VendasService,
    PrismaService,
  ],
})
export class VendasModule {}
