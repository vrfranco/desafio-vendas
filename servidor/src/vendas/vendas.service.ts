import { Injectable } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { Venda } from './entities/venda.entity';
import { VendasRepository } from './vendas.repository';
import { ProdutosRepository } from 'src/produtos/produtos.repository';
import { ProdutoTipo } from 'src/produtos/entities/produto.entity';
import { ProdutoAgrupado } from '@prisma/client';

@Injectable()
export class VendasService {
  constructor(
    private readonly vendasRepository: VendasRepository,
    private readonly produtosRepository: ProdutosRepository,
  ) {}

  async create(createVendaDto: CreateVendaDto): Promise<Venda | null> {
    const { items, cliente } = createVendaDto;

    const produtos = await Promise.all(
      items.map(async (item) => {
        const produto = await this.produtosRepository.findOneByWhere({
          id: item.produtoId,
        });

        const dados = (() => {
          switch (produto.tipo) {
            case ProdutoTipo.Agrupado:
              return {
                agrupados: ((produto as any)?.agrupados as any[]).map((item) => ({
                    produtoId: item.agrupado.id,
                    nome: item.agrupado.nome,
                  }),
                ),
              };
            case ProdutoTipo.Configuravel:
              return { tamanho: item.dados.tamanho, cor: item.dados.cor };
            case ProdutoTipo.Digital:
              return { link: (produto as any)?.configuravel?.link };
            default:
              return {};
          }
        })();

        return {
          dados,
          nome: produto.nome,
          tipo: produto.tipo,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          valorTotal: item.quantidade * (produto.valor as any),
          valorUnitario: produto.valor,
        };
      }),
    );

    const valorTotal: number = produtos.reduce(
      (base, item) => base + item.valorTotal,
      0,
    );

    const solicitacoes: string = produtos
      .map((item) => `${item.quantidade} x ${item.nome}`)
      .join(', ');

    const descricao: string = `${cliente.nome} solicitou ${solicitacoes}`;

    return this.vendasRepository.create({
      descricao,
      valorTotal,
      items: {
        create: produtos,
      },
      cliente: {
        create: cliente,
      },
    });
  }

  async findAll(): Promise<Venda[] | null> {
    return this.vendasRepository.findByWhere();
  }

  async findOneById(id: number): Promise<Venda | null> {
    return this.vendasRepository.findOneByWhere({ id });
  }
}
