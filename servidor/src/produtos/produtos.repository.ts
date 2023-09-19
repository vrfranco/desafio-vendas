import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private includes: Prisma.ProdutoInclude = {
    digital: true,
    configuravel: true,
    agrupados: {
      include: {
        agrupado: true,
      },
    },
  };

  async findOneByWhere(
    where: Prisma.ProdutoWhereUniqueInput,
  ): Promise<Produto | null> {
    return this.prismaService.produto.findUnique({
      where,
      include: this.includes,
    });
  }

  async findByWhere(
    where?: Prisma.ProdutoWhereInput,
  ): Promise<Produto[] | null> {
    return this.prismaService.produto.findMany({
      where,
      include: this.includes,
    });
  }

  async create(data: Prisma.ProdutoCreateInput): Promise<Produto | null> {
    return this.prismaService.produto.create({ data, include: this.includes });
  }

  async deleteOneByWhere(
    where?: Prisma.ProdutoWhereUniqueInput,
  ): Promise<Produto | null> {
    return this.prismaService.produto.delete({
      where,
      include: this.includes,
    });
  }

  async updateOneByWhere(
    where: Prisma.ProdutoWhereUniqueInput,
    data: Prisma.ProdutoUpdateInput,
  ): Promise<Produto | null> {
    return this.prismaService.produto.update({
      where,
      data,
      include: this.includes,
    });
  }
}
