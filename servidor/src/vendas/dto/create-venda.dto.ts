import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import {
  ProdutoCor,
  ProdutoTamanho,
} from 'src/produtos/entities/produto.entity';

export class CreateVendaDadosDto {
  @ApiProperty({ description: 'Cor do Produto' })
  @IsEnum(ProdutoCor)
  cor?: ProdutoCor;

  @ApiProperty({ description: 'Tamanho do Produto' })
  @IsEnum(ProdutoTamanho)
  tamanho?: ProdutoTamanho;
}

export class CreateVendaClienteDto {
  @ApiProperty({ description: 'Nome do Cliente' })
  @IsString({ message: 'Precisa ser um texto' })
  @IsNotEmpty({ message: 'Precisa do nome' })
  nome: string;

  @ApiProperty({ description: 'CPF do Cliente' })
  @IsString({ message: 'Precisa ser um texto' })
  @IsNotEmpty({ message: 'Precisa do CPF' })
  cpf: string;

  @ApiProperty({ description: 'Email do Cliente' })
  @IsString({ message: 'Precisa ser um texto' })
  @IsEmail({}, { message: 'Precisa de um e-mail válido' })
  @IsNotEmpty({ message: 'Precisa do e-mail' })
  email: string;
}

export class CreateVendaItemDto {
  @ApiProperty({ description: 'Quantidade do Produto do Item da Venda' })
  @IsInt({ message: 'Precisa ser número' })
  @Min(1, { message: 'Precisa ter adicionado pelo menos 1 produto' })
  quantidade: number;

  @ApiProperty({ description: 'ID do Produto' })
  @IsInt({ message: 'Precisa ser número' })
  @IsNotEmpty({ message: 'Precisa do produtoId' })
  produtoId: number;

  @ApiProperty({ description: 'Dados do Produto' })
  @ValidateNested()
  @Type(() => CreateVendaDadosDto)
  dados: CreateVendaDadosDto;
}

export class CreateVendaDto {
  @ApiProperty({ description: 'Cliente da Venda' })
  @IsNotEmptyObject({}, { message: 'Precisa do atributo "cliente"' })
  @ValidateNested()
  @Type(() => CreateVendaClienteDto)
  cliente: CreateVendaClienteDto;

  @ApiProperty({ description: 'Items da Venda' })
  @IsArray({ message: 'Precisa ser uma lista' })
  @ArrayMinSize(1, { message: 'Precisa ter pelo menos 1 produto' })
  @ValidateNested({ each: true })
  @Type(() => CreateVendaItemDto)
  items: CreateVendaItemDto[];
}
