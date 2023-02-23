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
        roomNumber: i,
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
      where: { roomNumber: reserveRoom.roomNumber },
    });
    const date = this.reservedDatesRepository.create({
      arrivalDate: reserveRoom.arrivalDate,
      departureDate: reserveRoom.departureDate,
      room,
    });
    for (const reservation of room.reservations) {
      if (
        moment(reserveRoom.arrivalDate).isBetween(
          reservation.arrivalDate,
          reservation.departureDate,
          'days',
          '[]',
        )
      ) {
        canReserve = false;
        break;
      }
      if (
        moment(reserveRoom.departureDate).isBetween(
          reservation.arrivalDate,
          reservation.departureDate,
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
    const allRooms = await this.hotelRoomsRepository.find({
      relations: { reservations: true },
    });
    return allRooms;
  }

  async findDatesForRoomsNumber(query): Promise<AvailableDatesType[]> {
    const getByRoomNumber = await this.reservedDatesRepository.find({
      relations: { room: true },
      where: { room: { roomNumber: query.roomNumber } },
    });
    return getByRoomNumber;
  }

  async findAllAvailableRooms(query): Promise<HotelRoomType[]> {
    const rooms = await this.hotelRoomsRepository.find({
      relations: { reservations: true },
    });
    const roomsAvailable: HotelRoomType[] = [];
    for (const roomNumber of rooms) {
      if (!roomNumber.reservations.length) {
        roomsAvailable.push(roomNumber);
      }
      roomNumber.reservations.forEach((el) => {
        if (
          moment(el.arrivalDate).isBetween(
            query.arrivalDate,
            query.departureDate,
            'days',
            '[]',
          )
        ) {
          return;
        }
        if (
          moment(el.departureDate).isBetween(
            query.arrivalDate,
            query.departureDate,
            'days',
            '[]',
          )
        ) {
          return;
        } else {
          roomsAvailable.push(roomNumber);
        }
      });
    }
    return roomsAvailable;
  }
}
