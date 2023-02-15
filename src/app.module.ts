import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';
import { CreateRoomsModule } from './controller/create-rooms/create-rooms.module';
import { ManageRoomsControllerModule } from './controller/hotel-rooms/manage-rooms-controller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ManageRoomsControllerModule,
    CreateRoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
