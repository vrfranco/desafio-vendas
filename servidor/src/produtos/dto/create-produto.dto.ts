import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { IsProdutoNomeUnicoValidator } from '../validations/is.produto.unico.validator';

import {
  ProdutoCor,
  ProdutoTamanho,
  ProdutoTipo,
} from '../entities/produto.entity';

export class CreateProdutoDigitalDto {
  @ApiProperty({ description: 'Link do Produto' })
  @IsNotEmpty({ message: 'Precisa do endereço' })
  @IsUrl({}, { message: 'Precisa ser um endereço válido' })
  link: string;
}

export class CreateProdutoAgrupadoDto {
  @ApiProperty({ description: 'ID do Produto Agrupado' })
  @Type(() => Number)
  @IsNumber()
  agrupadoId: number;
}

export class CreateProdutoConfiguravelDto {
  @ApiProperty({ description: 'Tamanho do Produto', enum: ProdutoTamanho })
  @IsEnum(ProdutoTamanho, { message: 'Preciso do tamanho válido' })
  tamanho: ProdutoTamanho;

  @ApiProperty({ description: 'Cor do Produto', enum: ProdutoCor })
  @IsEnum(ProdutoCor, { message: 'Preciso da cor válida' })
  cor: ProdutoCor;
}

export class CreateProdutoDto {
  @ApiProperty({ description: 'Nome do Produto' })
  @IsString({ message: 'O campo precisa ser texto' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  @MinLength(10, {
    message: 'Nome do produto precisa ter pelo menos 10 caracteres',
  })
  @MaxLength(100, {
    message: 'Nome do produto precisa ter no máximo 100 caracteres',
  })
  @Validate(IsProdutoNomeUnicoValidator, ['nome'])
  nome: string;

  @ApiProperty({ description: 'Descrição do Produto' })
  @IsString({ message: 'O campo precisa ser texto' })
  descricao: string;

  @ApiProperty({ description: 'Valor do Produto' })
  @IsNumber({}, { message: 'Precisa ser número' })
  @IsNotEmpty({ message: 'Precisa ser preenchido' })
  @Type(() => Number)
  valor: number;

  @ApiProperty({ enum: ProdutoTipo, description: 'Tipo de Produto' })
  @IsEnum(ProdutoTipo, { message: 'Precisa ser do tipo válido' })
  tipo: ProdutoTipo;

  @IsOptional()
  @IsDateString({}, { message: 'A data de criação precisa estar correta' })
  criado: Date;

  @IsOptional()
  @IsDateString({}, { message: 'A data de alteração precisa estar correta' })
  alterado: Date;

  @ApiProperty({ description: 'Digital do Produto' })
  @ValidateIf((produto) => produto.tipo === ProdutoTipo.Digital)
  @ValidateNested()
  @Type(() => CreateProdutoDigitalDto)
  @IsNotEmptyObject({}, { message: 'Precisa do atributo "digital"' })
  digital: CreateProdutoDigitalDto;

  @ApiProperty({ description: 'Items de Produtos Agrupados', isArray: true })
  @ValidateIf((produto) => produto.tipo === ProdutoTipo.Agrupado)
  @ValidateNested({ each: true })
  @Type(() => CreateProdutoAgrupadoDto)
  @ArrayMinSize(1, { message: 'Precisa ter pelo menos 1 produto adicionado' })
  @IsArray({ message: 'Precisa do atributo "agrupados"' })
  agrupados: CreateProdutoAgrupadoDto[];

  @ApiProperty({ description: 'Configuração do Produto' })
  @ValidateIf((produto) => produto.tipo === ProdutoTipo.Configuravel)
  @ValidateNested()
  @Type(() => CreateProdutoConfiguravelDto)
  @IsNotEmptyObject({}, { message: 'Precisa do atributo "configuravel"' })
  configuravel: CreateProdutoConfiguravelDto;
}
