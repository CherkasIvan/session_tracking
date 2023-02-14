import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';
import { HotelRoomsControllerModule } from './controller/hotel-rooms/hotel-rooms-controller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    HotelRoomsControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
