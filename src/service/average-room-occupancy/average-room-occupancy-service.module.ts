import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { ReservedDatesEntity } from 'src/model/reserved-dates.entity';
import { AverageRoomOccupancyService } from './average-room-occupancy.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRoomsEntity, ReservedDatesEntity])],
  providers: [AverageRoomOccupancyService],
  exports: [AverageRoomOccupancyService],
})
export class AverageRoomOccupancyServiceModule {}
