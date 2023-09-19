import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError, useContainer } from 'class-validator';

function mapTo(validationErrors: ValidationError[] = []) {
  return validationErrors.map((error) => ({
    field: error.property,
    error: error.constraints ? Object.values(error.constraints) : [],
    children: error.children ? mapTo(error.children) : [],
  }));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(mapTo(validationErrors));
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Desafio da Imagetech')
    .setDescription('CRUD de Produtos e Vendas')
    .setVersion('1.0')
    .addTag('produtos')
    .addTag('vendas')
    //.addTag('estoques')
    //.addTag('usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
