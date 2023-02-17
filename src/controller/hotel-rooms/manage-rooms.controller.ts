import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ManageRoomsService } from '../../service/manage-rooms/manage-rooms.service';

import { CreateRoomDto } from './dto/create-room.dto';
import { ReserveRoomDto } from './dto/reserve-room.dto';

import { HotelRoomType } from '../../interface/hotel-room.type';
import { AvailableDatesType } from '../../interface/available-dates.type';

import * as moment from 'moment';

@ApiTags('Manage hotel rooms')
@Controller('hotel-rooms')
export class ManageRoomsController {
  constructor(private manageRoomsService: ManageRoomsService) {}

  @Post('/create-rooms')
  async createDefaultRooms(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<HotelRoomType[]> {
    if (typeof createRoomDto.roomsNumber === 'number') {
      return this.manageRoomsService.createDefaultRooms(createRoomDto);
    } else {
      throw new BadRequestException(
        'Your should write correct number of creating rooms',
        {
          cause: new Error(),
          description: 'Invalid input format',
        },
      );
    }
  }

  @Post('/reserve-room')
  async reserveRoom(
    @Body() reserveRoom: ReserveRoomDto,
  ): Promise<AvailableDatesType> {
    const difference = moment(reserveRoom.departureDate).diff(
      moment(reserveRoom.arrivalDate),
      'days',
    );

    if (difference >= 0 && typeof reserveRoom.roomsNumber === 'number') {
      return this.manageRoomsService.reserveRoom(reserveRoom);
    } else {
      throw new BadRequestException(
        'Departure date cant be more then arrival date',
        {
          cause: new Error(),
          description: 'Departure date is more then arrival date',
        },
      );
    }
  }

  @Get('/find-all-rooms')
  async findAllRooms(): Promise<HotelRoomType[]> {
    try {
      return await this.manageRoomsService.findAllRooms();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No rooms created',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/find-all-dates-of-room')
  findOneDateByRoomsNumber(
    @Query() query: CreateRoomDto,
  ): Promise<AvailableDatesType[]> {
    return this.manageRoomsService.findDatesForRoomsNumber(query);
  }

  // @Post('/create-dates')
  // async createDefaultDates(
  //   @Body() createDatesDto: CreateDatesDto,
  // ): Promise<any> {
  //   return this.manageRoomsService.createDefaultDates(createDatesDto);
  // }

  /* Endpoint for creating rooms with different numbers */

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
