import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { VendasModule } from './vendas/vendas.module';
import { EstoquesModule } from './estoques/estoques.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrismaService } from './prisma.service';
import { AppLoggerMiddleware } from './app.logger.middleware';

@Module({
  imports: [ProdutosModule, VendasModule, EstoquesModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
