import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { RoomsModule } from 'src/service/rooms/rooms.module';
import { HotelRoomsController } from './hotel-rooms.controller';

@Module({
  imports: [RoomsModule, TypeOrmModule.forFeature([HotelRoomsEntity])],
  providers: [],
  controllers: [HotelRoomsController],
})
export class HotelRoomsControllerModule {}
