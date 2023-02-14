import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { RoomsService } from 'src/service/rooms/rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';

@ApiTags('Hotel-rooms')
@Controller('hotel-rooms')
export class HotelRoomsController {
  constructor(private hotelRoomsService: RoomsService) {}

  @Post('/create-rooms')
  async createRooms(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<HotelRoomsEntity[]> {
    // const room = await this.hotelRoomsService.getRoom(createRoomDto.roomNumber);
    // if (room !== null) {
    //   throw new BadRequestException('This room is already created');
    // }
    return this.hotelRoomsService.createDefaultRooms(createRoomDto);
  }

  @Get()
  getAllRooms(): Promise<HotelRoomsEntity[]> {
    return this.hotelRoomsService.getAllRooms();
  }

  @Get('/available')
  getAllAvailable(): Promise<HotelRoomsEntity[]> {
    return this.hotelRoomsService.getAllAvailable();
  }

  // @Post()
  // async createRoom(
  //   @Body() createRoomDto: CreateRoomDto,
  // ): Promise<HotelRoomsEntity> {
  //   const room = await this.hotelRoomsService.getRoom(createRoomDto.roomNumber);
  //   if (room !== null) {
  //     throw new BadRequestException('This room is already created');
  //   }
  //   return this.hotelRoomsService.createRoom(createRoomDto);
  // }

  // @Get('/room')
  // async getRoom(
  //   @Query('room_number') room_number: number,
  // ): Promise<HotelRoomsEntity> {
  //   return this.hotelRoomsService.getRoom(room_number);
  // }

  // @Get('/init-all-rooms')
  // async getAllRooms(
  //   @Query('room_number') room_number: number,
  // ): Promise<HotelRoomsEntity> {
  //   return this.hotelRoomsService.getRoom(room_number);
  // }
}
