import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { HotelRoomsEntity } from '../../model/hotel-rooms.entity';
import { ReservedDatesEntity } from '../../model/reserved-dates.entity';

import { CreateRoomDto } from '../../controller/hotel-rooms/dto/create-room.dto';
import { ReserveRoomDto } from '../../controller/hotel-rooms/dto/reserve-room.dto';

import { AvailableDatesType } from '../../interface/available-dates.type';
import { HotelRoomType } from '../../interface/hotel-room.type';
import * as moment from 'moment';

@Injectable()
export class ManageRoomsService {
  constructor(
    @InjectRepository(HotelRoomsEntity)
    private readonly hotelRoomsRepository: Repository<HotelRoomsEntity>,

    @InjectRepository(ReservedDatesEntity)
    private readonly reservedDatesRepository: Repository<ReservedDatesEntity>,
  ) {}

  async createDefaultRooms(
    createRoomDto: CreateRoomDto,
  ): Promise<HotelRoomType[]> {
    await this.reservedDatesRepository.delete({});
    await this.hotelRoomsRepository.delete({});
    const rooms: HotelRoomType[] = [];
    for (let i = 1; i <= createRoomDto.roomNumber; i++) {
      const room: HotelRoomType = {
        room_number: i,
      };
      rooms.push(room);
    }
    await this.hotelRoomsRepository.save(rooms);

    return rooms;
  }

  async reserveRoom(reserveRoom: ReserveRoomDto): Promise<AvailableDatesType> {
    let canReserve = true;
    const room = await this.hotelRoomsRepository.findOne({
      relations: { reservations: true },
      where: { room_number: reserveRoom.roomNumber },
    });
    const date = this.reservedDatesRepository.create({
      arrival_date: reserveRoom.arrivalDate,
      departure_date: reserveRoom.departureDate,
      room,
    });
    for (const reservation of room.reservations) {
      if (
        moment(reserveRoom.arrivalDate).isBetween(
          reservation.arrival_date,
          reservation.departure_date,
          'days',
          '[]',
        )
      ) {
        canReserve = false;
        break;
      }
      if (
        moment(reserveRoom.departureDate).isBetween(
          reservation.arrival_date,
          reservation.departure_date,
          'days',
          '[]',
        )
      ) {
        canReserve = false;
        break;
      }
    }

    if (canReserve) {
      const reservedDates = await this.reservedDatesRepository.save(date);
      return await this.reservedDatesRepository.findOne({
        relations: { room: true },
        where: { id: reservedDates.id },
      });
    } else {
      throw new BadRequestException(
        'You cant reserve room because it is already booked',
        {
          cause: new Error(),
          description: 'You cant reserve room because it is already booked',
        },
      );
    }
  }

  async findAllRooms(): Promise<HotelRoomType[]> {
    return this.hotelRoomsRepository.find({
      relations: { reservations: true },
    });
  }

  async findDatesForRoomsNumber(query): Promise<AvailableDatesType[]> {
    return this.reservedDatesRepository.find({
      relations: { room: true },
      where: { room: { room_number: query.room_number } },
    });
  }

  async findAllAvailableRooms(query): Promise<HotelRoomType[]> {
    const rooms = await this.hotelRoomsRepository.find({
      relations: { reservations: true },
    });
    const roomsAvailable: HotelRoomType[] = [];
    for (const room_number of rooms) {
      if (!room_number.reservations.length) {
        roomsAvailable.push(room_number);
      }
      room_number.reservations.forEach((el) => {
        if (
          moment(el.arrival_date).isBetween(
            query.arrivalDate,
            query.departureDate,
            'days',
            '[]',
          )
        ) {
          return;
        }
        if (
          moment(el.departure_date).isBetween(
            query.arrivalDate,
            query.departureDate,
          )
        ) {
          return;
        } else {
          roomsAvailable.push(room_number);
        }
      });
    }
    return roomsAvailable;
  }
}
