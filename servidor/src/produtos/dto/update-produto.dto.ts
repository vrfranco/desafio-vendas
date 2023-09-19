import {
  CreateProdutoDto,
  CreateProdutoAgrupadoDto,
  CreateProdutoConfiguravelDto,
  CreateProdutoDigitalDto,
} from './create-produto.dto';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProdutoTipo } from '../entities/produto.entity';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class UpdateProdutoAgrupadoDto extends CreateProdutoAgrupadoDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: 'ID do Produto Agrupado' })
  @IsOptional()
  @ValidateIf((item) => item.excluido, {
    message: 'Precisa do atributo "excluído"',
  })
  id?: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: 'ID da Relação do Produto Agrupado de Origem' })
  @ValidateIf((item) => item.id && item.agrupadoId, {
    message: 'Precisa do atributo "id" ou "agrupadoId"',
  })
  produtoId?: number;

  @ApiProperty({ description: 'Atributo de Exclusão' })
  @IsBoolean({ message: 'Precisa ser "true" ou "false"' })
  @Type(() => Boolean)
  @ValidateIf((item) => item.id, {
    message: 'Precisa do atributo "id"',
  })
  excluido?: boolean;
}

export class UpdateProdutoConfiguravelDto extends CreateProdutoConfiguravelDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: 'ID do Produto Configurável' })
  id?: number;
}

export class UpdateProdutoDigitalDto extends CreateProdutoDigitalDto {
  @ApiProperty({ description: 'ID do Produto Digital' })
  id?: number;
}

export class UpdateProdutoDto extends PartialType(
  OmitType(CreateProdutoDto, ['tipo'] as const),
) {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: 'ID do produto' })
  id: number;

  @IsEnum(ProdutoTipo, { message: 'Precisa ser do tipo válido' })
  @ApiProperty({ enum: ProdutoTipo, description: 'Tipo de Produto' })
  tipo: ProdutoTipo;

  @Type(() => UpdateProdutoAgrupadoDto)
  agrupados?: UpdateProdutoAgrupadoDto[];

  @Type(() => UpdateProdutoDigitalDto)
  digital?: UpdateProdutoDigitalDto;

  @Type(() => UpdateProdutoConfiguravelDto)
  configuravel?: UpdateProdutoConfiguravelDto;
}
