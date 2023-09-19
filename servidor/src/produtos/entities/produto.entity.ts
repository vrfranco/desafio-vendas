import {
  Produto as ProdutoPrisma,
  ProdutoTipo as ProdutoTipoPrisma,
  ProdutoTamanho as ProdutoTamanhoPrisma,
  ProdutoCor as ProdutoCorPrisma,
} from '@prisma/client';

export type Produto = ProdutoPrisma;
export type ProdutoTipo = ProdutoTipoPrisma;
export const ProdutoTipo = ProdutoTipoPrisma;
export type ProdutoTamanho = ProdutoTamanhoPrisma;
export const ProdutoTamanho = ProdutoTamanhoPrisma;
export type ProdutoCor = ProdutoCorPrisma;
export const ProdutoCor = ProdutoCorPrisma;
