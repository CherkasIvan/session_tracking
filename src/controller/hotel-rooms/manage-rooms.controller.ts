import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
import { CreateDatesDto } from './dto/create-dates.dto';

@ApiTags('Manage hotel rooms')
@Controller('hotel-rooms')
export class ManageRoomsController {
  constructor(private manageRoomsService: ManageRoomsService) {}

  @Post('/create-rooms')
  async createDefaultRooms(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<HotelRoomType[]> {
    return this.manageRoomsService.createDefaultRooms(createRoomDto);
  }

  @Post('/reserve-room')
  async reserveRoom(
    @Body() reserveRoom: ReserveRoomDto,
  ): Promise<AvailableDatesType> {
    const difference = moment(reserveRoom.departureDate).diff(
      moment(reserveRoom.arrivalDate),
      'days',
    );

    if (difference >= 0) {
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
    return await this.manageRoomsService.findAllRooms();
  }

  @Get('/find-all-dates-of-room')
  findOneDateByRoomsNumber(
    @Param('rosudo rm -r postgres/ && mkdir  postgresomNumber', ParseIntPipe)
    queryNumber: CreateRoomDto,
  ): Promise<AvailableDatesType[]> {
    return this.manageRoomsService.findDatesForRoomsNumber(queryNumber);
  }

  // /* Get all hotel rooms */
  @Get('/all-available')
  async findAllAvailableRooms(
    @Query() queryDate: CreateDatesDto,
  ): Promise<HotelRoomType[]> {
    console.log(typeof queryDate);
    return await this.manageRoomsService.findAllAvailableRooms(queryDate);
  }
  // /* Get all available hotel rooms */
}
