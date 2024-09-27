import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Cambia según el tipo de base de datos
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'), // Cambia según el puerto de tu base de datos
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Book], // Asegúrate de incluir tus entidades
        synchronize: true,
      })
    }),
    BookModule,
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
