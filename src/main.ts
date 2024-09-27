import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/')
  
  //falta aplicar seeders
  await app.listen(3000);
}
bootstrap();
