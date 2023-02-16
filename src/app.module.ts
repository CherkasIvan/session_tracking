import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';
import { ManageRoomsControllerModule } from './controller/hotel-rooms/manage-rooms-controller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ManageRoomsControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
