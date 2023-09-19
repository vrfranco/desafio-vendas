import { Module } from '@nestjs/common';
import { EstoquesService } from './estoques.service';
import { EstoquesController } from './estoques.controller';

@Module({
  controllers: [EstoquesController],
  providers: [EstoquesService],
})
export class EstoquesModule {}
