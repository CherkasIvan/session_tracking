import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ManageRoomsControllerModule } from './controller/hotel-rooms/manage-rooms-controller.module';

import { HotelRoomsEntity } from './model/hotel-rooms.entity';
import { ReservedDatesEntity } from './model/reserved-dates.entity';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DATABASE'),
        port: config.get<number>('POSTGRES_PORT'),
        entities: [HotelRoomsEntity, ReservedDatesEntity],
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
    ManageRoomsControllerModule,
    SharedModule,
  ],
})
export class AppModule {}
