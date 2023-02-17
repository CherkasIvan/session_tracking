import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { HotelRoomsEntity } from '../../model/hotel-rooms.entity';
import { ReservedDatesEntity } from '../../model/reserved-dates.entity';

import { CreateRoomDto } from '../../controller/hotel-rooms/dto/create-room.dto';
import { ReserveRoomDto } from '../../controller/hotel-rooms/dto/reserve-room.dto';

import { AvailableDatesType } from '../../interface/available-dates.type';
import { HotelRoomType } from '../../interface/hotel-room.type';

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
    for (let i = 1; i <= createRoomDto.roomsNumber; i++) {
      const room: HotelRoomType = {
        roomsNumber: i,
      };
      rooms.push(room);
    }
    await this.hotelRoomsRepository.save(rooms);

    return rooms;
  }

  async reserveRoom(reserveRoom: ReserveRoomDto): Promise<AvailableDatesType> {
    const room = await this.hotelRoomsRepository.findOne({
      where: { roomsNumber: reserveRoom.roomsNumber },
    });
    const date = {
      arrivalDate: reserveRoom.arrivalDate,
      departureDate: reserveRoom.departureDate,
      room,
    };
    return await this.reservedDatesRepository.save(date);
  }

  async findAllRooms(): Promise<HotelRoomType[]> {
    const allRooms = await this.hotelRoomsRepository.find();
    return allRooms;
  }

  async findDatesForRoomsNumber(query): Promise<AvailableDatesType[]> {
    const getByRoomNumber = await this.reservedDatesRepository.findBy({
      room: query.roomNumber,
    });
    return getByRoomNumber;
  }

  // async createDefaultDates(createDatesDto: CreateDatesDto): Promise<any> {
  //   await this.hotelRoomsRepository.delete({});
  //   await this.reservedDatesRepository.delete({});
  //   const rooms: HotelRoomType[] = [];
  //   const date: AvailableDatesType[] = [];
  //   for (let i = 1; i <= createDatesDto.roomNumber; i++) {
  //     const room: HotelRoomType = {
  //       roomNumber: i,
  //     };

  //     rooms.push(room);
  //     await this.hotelRoomsRepository.save(room);

  //     date.push({
  //       arrivalDate: createDatesDto.arrivalDate,
  //       departureDate: createDatesDto.departureDate,
  //       room,
  //     });
  //     await this.reservedDatesRepository.save(date);
  //   }

  //   return date;
  // }

  /*
Function for creating random availability of numbers in a hotel and getDate from present
 */

  //   public dayAvailabilityOfRoom(daysNumber: number): IBookingDates[] {
  //     const datesRange: IBookingDates[] = [];
  //     const startDate: Date = new Date();
  //     for (let i = 0; i < daysNumber; i++) {
  //       const bookedDay: string = new Date(
  //         startDate.setDate(startDate.getDate() + 1),
  //       )
  //         .toISOString()
  //         .split('T')[0];
  //       const availability: boolean = Math.random() < 0.5;
  //       datesRange.push({ bookedDay, availability });
  //     }
  //     return datesRange;
  //   }

  //   async getAllAvailableRooms(): Promise<any> {
  //     const allRooms = await this.getAllRooms();
  //     allRooms.forEach((el) => {
  //       el.bookingDates = el.bookingDates.filter((el) => el.availability);
  //     });

  //     // if (searchDates) {
  //     //   const availableByDate: number[] = [];
  //     //   allRooms.forEach((room) => {
  //     //     room.bookingDates.filter((booked) => {
  //     //       if (booked.bookedDay === searchDates) {
  //     //         availableByDate.push(room.room_number);
  //     //       }
  //     //     });
  //     //   });
  //     //   return availableByDate;
  //     // }

  //     // if (roomNumber) {
  //     //   const roomsByNumbers = allRooms.find((room) => {
  //     //     if (room.room_number == roomNumber) {
  //     //       return room;
  //     //     }
  //     //   });
  //     //   return roomsByNumbers;
  //     // }

  //     return allRooms;
  //   }

  //   // async bookingRoom(bookRoomDto: BookRoomDto): Promise<HotelRoomsEntity> {
  //   //   const allAvailableRooms = await this.getAvailable();
  //   //   const getByRoomNumber = await this.hotelRoomsRepository.findBy({
  //   //     room_number: bookRoomDto.roomNumber,
  //   //   });
  //   //   getByRoomNumber.forEach((el) => {
  //   //     el.bookingDates = JSON.parse(el.bookingDates);
  //   //   });

  //   //   let bookedRoom!: IHotelRoom;
  //   //   allAvailableRooms.find((roomNumber) => {
  //   //     if (roomNumber.room_number === bookRoomDto.roomNumber) {
  //   //       roomNumber.bookingDates.filter((booked) => {
  //   //         if (booked.bookedDay === bookRoomDto.searchDates) {
  //   //           booked.availability = false;
  //   //           bookedRoom = roomNumber;
  //   //           return bookedRoom;
  //   //         }
  //   //       });
  //   //     }
  //   //     return bookedRoom;
  //   //   });
  //   //   return bookedRoom;
  //   // }
}
