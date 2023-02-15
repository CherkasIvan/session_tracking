import { Module } from '@nestjs/common';
import { CreateRoomsServiceModule } from 'src/service/create-rooms/create-rooms-service.module';
import { CreateRoomsController } from './create-rooms.controller';

@Module({
  imports: [CreateRoomsServiceModule],
  providers: [],
  controllers: [CreateRoomsController],
})
export class CreateRoomsModule {}
