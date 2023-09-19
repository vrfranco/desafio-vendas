import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaService } from 'src/prisma.service';
import { IsProdutoNomeUnicoValidator } from './validations/is.produto.unico.validator';
import { ProdutosRepository } from './produtos.repository';

@Module({
  controllers: [ProdutosController],
  providers: [
    IsProdutoNomeUnicoValidator,
    ProdutosRepository,
    ProdutosService,
    PrismaService,
  ],
})
export class ProdutosModule {}
