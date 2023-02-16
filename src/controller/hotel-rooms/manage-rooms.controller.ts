import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { ManageRoomsService } from 'src/service/manage-rooms/manage-rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { BookRoomDto } from './dto/book-room.dto';
import { CreateDatesDto } from './dto/create-dates.dto';
import { HotelRoomType } from 'src/interface/hotel-room.type';

@ApiTags('Manage hotel rooms')
@Controller('hotel-rooms')
export class ManageRoomsController {
  constructor(private manageRoomsService: ManageRoomsService) {}

  @Post('/create-rooms')
  async createDefaultRooms(@Body() createRoomDto: CreateRoomDto): Promise<any> {
    return this.manageRoomsService.createDefaultRooms(createRoomDto);
  }

  // @Post('/create-dates')
  // async createDefaultDates(
  //   @Body() createDatesDto: CreateDatesDto,
  // ): Promise<any> {
  //   return this.manageRoomsService.createDefaultDates(createDatesDto);
  // }

  /* Endpoint for creating rooms with different numbers */

  @Get()
  getAllRooms(): Promise<HotelRoomType[]> {
    return this.manageRoomsService.getAllRooms();
  }

  // /* Get all hotel rooms */

  // @Get('/all-available')
  // // @ApiQuery({ name: 'roomNumber', required: false })
  // // @ApiQuery({ name: 'searchDates', required: false })
  // getAllAvailableRooms(): // @Query('roomNumber') roomNumber?: number,
  // // @Query('searchDates') searchDates?: string,
  // Promise<HotelRoomsEntity[]> {
  //   return this.manageRoomsService.getAllAvailableRooms();
  // }

  // /* Get all available hotel rooms */

  // // @Patch('/book-room')
  // // async bookingRoom(
  // //   @Body() bookRoomDto: BookRoomDto,
  // // ): Promise<HotelRoomsEntity> {
  // //   return this.manageRoomsService.bookingRoom(bookRoomDto);
  // // }
}
