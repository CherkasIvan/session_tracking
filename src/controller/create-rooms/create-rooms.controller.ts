import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { CreateRoomsService } from 'src/service/create-rooms/create-rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';

@ApiTags('Create a base number of rooms')
@Controller('create-rooms')
export class CreateRoomsController {
  constructor(private createRoomsService: CreateRoomsService) {}

  @Post()
  async createRooms(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<HotelRoomsEntity[]> {
    return this.createRoomsService.createDefaultRooms(createRoomDto);
  }
}
