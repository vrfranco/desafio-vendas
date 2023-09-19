import { Prisma } from '@prisma/client';
import { Venda } from './entities/venda.entity';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VendasRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private includes: Prisma.VendaInclude = {
    items: true,
  };

  async findOneByWhere(
    where: Prisma.VendaWhereUniqueInput,
  ): Promise<Venda | null> {
    return this.prismaService.venda.findUnique({
      where,
      include: this.includes,
    });
  }

  async findByWhere(where?: Prisma.VendaWhereInput): Promise<Venda[] | null> {
    return this.prismaService.venda.findMany({
      where,
      include: this.includes,
    });
  }

  async create(data: Prisma.VendaCreateInput): Promise<Venda | null> {
    return this.prismaService.venda.create({ data, include: this.includes });
  }

  async deleteOneByWhere(
    where?: Prisma.VendaWhereUniqueInput,
  ): Promise<Venda | null> {
    return this.prismaService.venda.delete({
      where,
      include: this.includes,
    });
  }

  async updateOneByWhere(
    where: Prisma.VendaWhereUniqueInput,
    data: Prisma.VendaUpdateInput,
  ): Promise<Venda | null> {
    return this.prismaService.venda.update({
      where,
      data,
      include: this.includes,
    });
  }
}
