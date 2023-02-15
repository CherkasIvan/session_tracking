import { Module } from '@nestjs/common';
import { ManageRoomsServiceModule } from 'src/service/manage-rooms/manage-rooms-service.module';
import { ManageRoomsController } from './manage-rooms.controller';

@Module({
  imports: [ManageRoomsServiceModule],
  providers: [],
  controllers: [ManageRoomsController],
})
export class ManageRoomsControllerModule {}
