import { Module } from '@nestjs/common';
import { AverageRoomOccupancyServiceModule } from 'src/service/average-room-occupancy/average-room-occupancy-service.module';
import { AverageRoomOccupancyController } from './average-room-occupancy.controller';

@Module({
  imports: [AverageRoomOccupancyServiceModule],
  controllers: [AverageRoomOccupancyController],
})
export class AverageRoomOccupancyModule {}
