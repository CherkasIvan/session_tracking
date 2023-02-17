import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ManageRoomsControllerModule } from './controller/hotel-rooms/manage-rooms-controller.module';

import { HotelRoomsEntity } from './model/hotel-rooms.entity';
import { ReservedDatesEntity } from './model/reserved-dates.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get('POSTGRES_HOST') as 'postgres',
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DATABASE'),
        port: config.get<number>('POSTGRES_PORT'),
        entities: [HotelRoomsEntity, ReservedDatesEntity],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    ManageRoomsControllerModule,
  ],
})
export class AppModule {}
