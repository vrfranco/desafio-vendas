import {
  Venda as VendaPrisma,
  VendaItem as VendaItemPrisma,
  Cliente as ClientePrisma,
} from '@prisma/client';

export type Cliente = ClientePrisma;
export type Venda = VendaPrisma;
export type VendaItem = VendaItemPrisma;
