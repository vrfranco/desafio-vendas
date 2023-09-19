import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { Venda } from './entities/venda.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('vendas')
@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra uma venda' })
  @ApiBody({ type: CreateVendaDto })
  create(@Body() createVendaDto: CreateVendaDto): Promise<Venda | null> {
    return this.vendasService.create(createVendaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consulta várias vendas' })
  findAll() {
    return this.vendasService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID da venda' })
  @ApiOperation({ summary: 'Consulta um produto' })
  @ApiResponse({
    status: 200,
    description: 'Retorna os dados de uma unica venda',
  })
  findOne(@Param('id') id: string): Promise<Venda | null> {
    return this.vendasService.findOneById(+id);
  }
}
