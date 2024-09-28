import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/')
  const config = new DocumentBuilder()
  .setTitle('Library API')
  .setDescription('A simple API for managing a library')
  .setVersion('v0.1')
  .addTag('library')
  .build();
  //falta aplicar seeders

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
  await app.listen(3000);
}
bootstrap();
