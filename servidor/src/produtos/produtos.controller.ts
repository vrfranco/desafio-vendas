import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Produto } from './entities/produto.entity';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um produto' })
  @ApiBody({ type: CreateProdutoDto })
  async create(
    @Body() createProdutoDto: CreateProdutoDto,
  ): Promise<Produto | null> {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consulta vários produtos' })
  async findAll(): Promise<Produto[] | null> {
    return this.produtosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consulta um produto' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Retorna os dados do Produto' })
  findOne(@Param('id') id: string): Promise<Produto | null> {
    return this.produtosService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Alteração de um produto' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do produto' })
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID do produto' })
  @ApiOperation({ summary: 'Exclusão de um produto' })
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
