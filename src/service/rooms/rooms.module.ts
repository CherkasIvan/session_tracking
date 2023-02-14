import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRoomsEntity])],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
