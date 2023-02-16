import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { ReservedDatesEntity } from 'src/model/reserved-dates.entity';
import { ManageRoomsService } from './manage-rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRoomsEntity, ReservedDatesEntity])],
  providers: [ManageRoomsService],
  exports: [ManageRoomsService],
})
export class ManageRoomsServiceModule {}
