import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { ManageRoomsService } from 'src/service/manage-rooms/manage-rooms.service';
import { BookRoomDto } from './dto/book-room.dto';

@ApiTags('Manage hotel rooms')
@Controller('hotel-rooms')
export class ManageRoomsController {
  constructor(private manageRoomsService: ManageRoomsService) {}

  @Get()
  getAllRooms(): Promise<HotelRoomsEntity[]> {
    return this.manageRoomsService.getAllRooms();
  }

  @Get('/available')
  @ApiQuery({ name: 'roomNumber', required: false })
  @ApiQuery({ name: 'searchDates', required: false })
  getAvailable(
    @Query('roomNumber') roomNumber?: number,
    @Query('searchDates') searchDates?: string,
  ): Promise<HotelRoomsEntity[]> {
    return this.manageRoomsService.getAvailable(roomNumber, searchDates);
  }

  @Patch('/book-room')
  async bookingRoom(
    @Body() bookRoomDto: BookRoomDto,
  ): Promise<HotelRoomsEntity> {
    return this.manageRoomsService.bookingRoom(bookRoomDto);
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
