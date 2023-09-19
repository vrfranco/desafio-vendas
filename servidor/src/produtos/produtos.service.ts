import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto, ProdutoTipo } from './entities/produto.entity';
import { ProdutosRepository } from './produtos.repository';

@Injectable()
export class ProdutosService {
  constructor(private readonly produtoRepository: ProdutosRepository) {}

  async create(data: CreateProdutoDto): Promise<Produto | null> {
    const simples = (({ nome, descricao, valor, tipo }) => ({
      nome,
      descricao,
      valor,
      tipo,
    }))(data);

    if (data.tipo == ProdutoTipo.Agrupado) {
      return this.produtoRepository.create({
        ...simples,
        agrupados: {
          createMany: { data: data.agrupados },
        },
      });
    } else if (data.tipo == ProdutoTipo.Configuravel) {
      return this.produtoRepository.create({
        ...simples,
        configuravel: {
          create: data.configuravel,
        },
      });
    } else if (data.tipo == ProdutoTipo.Digital) {
      return this.produtoRepository.create({
        ...simples,
        digital: {
          create: data.digital,
        },
      });
    } else {
      return this.produtoRepository.create(simples);
    }
  }

  async update(id: number, data: UpdateProdutoDto): Promise<Produto | null> {
    const simples: { nome?: string; descricao?: string; valor?: number } = data;

    if (data.tipo == ProdutoTipo.Agrupado) {
      return this.produtoRepository.updateOneByWhere(
        { id },
        {
          ...simples,
          agrupados: {
            create: data.agrupados.filter((item) => !item.id),
            delete: data.agrupados
              .filter((item) => item.excluido)
              .map((item) => ({ id: item.id })),
          },
        },
      );
    } else if (data.tipo == ProdutoTipo.Configuravel) {
      return this.produtoRepository.updateOneByWhere(
        { id },
        {
          ...simples,
          configuravel: {
            update: {
              where: { id: data.configuravel.id },
              data: {
                tamanho: data.configuravel.tamanho,
                cor: data.configuravel.cor,
              },
            },
          },
        },
      );
    } else if (data.tipo == ProdutoTipo.Digital) {
      return this.produtoRepository.updateOneByWhere(
        { id },
        {
          ...simples,
          digital: {
            update: {
              where: { id: data.digital.id },
              data: { link: data.digital.link },
            },
          },
        },
      );
    } else {
      return this.produtoRepository.updateOneByWhere({ id }, simples);
    }
  }

  async findAll(): Promise<Produto[] | null> {
    return this.produtoRepository.findByWhere();
  }

  async findOneById(id: number): Promise<Produto | null> {
    return this.produtoRepository.findOneByWhere({ id });
  }

  async remove(id: number): Promise<Produto | null> {
    return this.produtoRepository.deleteOneByWhere({ id });
  }
}
