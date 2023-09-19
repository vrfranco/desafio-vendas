import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from '../produtos.repository';

@ValidatorConstraint({ name: 'IsProdutoNomeUnico', async: true })
@Injectable()
export class IsProdutoNomeUnicoValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const entity = await this.produtosRepository.findOneByWhere({
      nome: value,
    });

    const { id } = validationArguments.object as { id: number };

    return (entity && entity.id == id) || !entity;
  }

  defaultMessage() {
    return 'Produto já cadastrado';
  }
}
