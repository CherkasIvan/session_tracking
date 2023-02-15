import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { CreateRoomsService } from './create-rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRoomsEntity])],
  providers: [CreateRoomsService],
  exports: [CreateRoomsService],
})
export class CreateRoomsServiceModule {}
