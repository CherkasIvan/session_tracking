import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRoomDto } from 'src/controller/hotel-rooms/dto/book-room.dto';
import { CreateRoomDto } from 'src/controller/hotel-rooms/dto/create-room.dto';
import { IBookingDates } from 'src/interface/booking-dates.interface';
import { IHotelRoom } from 'src/interface/hotel-room.interface';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(HotelRoomsEntity)
    private readonly roomsRepository: Repository<HotelRoomsEntity>,
  ) {}

  async createDefaultRooms(
    createRoomDto: CreateRoomDto,
  ): Promise<HotelRoomsEntity[]> {
    await this.roomsRepository.clear();
    const rooms: IHotelRoom[] = [];
    const roomsNumber = createRoomDto.roomNumber;
    for (let i = 1; i <= roomsNumber; i++) {
      const room = {
        room_number: i,
        bookingDates: JSON.stringify(
          this.dayAvailabilityOfRoom(createRoomDto.searchDates),
        ),
      };
      rooms.push(room);
      await this.roomsRepository.save(room);
    }
    return rooms;
  }

  async getAllRooms(): Promise<any[]> {
    const allRooms = await this.roomsRepository.find();
    allRooms.forEach((el) => {
      el.bookingDates = JSON.parse(el.bookingDates);
    });
    return allRooms;
  }

  async getAvailable(roomNumber: number, searchDates: string): Promise<any[]> {
    const allRooms = await this.getAllRooms();
    allRooms.forEach((el) => {
      el.bookingDates = el.bookingDates.filter((el) => el.availability);
    });

    if (searchDates) {
      allRooms.forEach((room) =>
        room.bookingDates.filter((booked) => {
          booked.bookedDay == searchDates;
          console.log(booked);
        }),
      );
      console.log(allRooms);
      return allRooms;
    }

    if (roomNumber) {
      const roomsByNumbers = allRooms.find((room) => {
        if (room.room_number == roomNumber) {
          console.log(room);
          return room;
        }
      });
      return roomsByNumbers;
    }

    if (!roomNumber || !searchDates) {
      return allRooms;
    }
  }

  async bookingRoom(bookRoomDto: BookRoomDto): Promise<HotelRoomsEntity> {
    // const allAvailableRooms = await this.getAvailable();
    // const availableRoomNumber = allAvailableRooms.find((roomNum) => {
    //   if (roomNum.room_number == bookRoomDto.roomNumber) {
    //     const bookingDate = roomNum.bookingDates.forEach((date) => {
    //       if (date.bookingDates == bookRoomDto.searchDates) {
    //         return date;
    //       }
    //     });
    //     return [roomNum, bookingDate];
    //   }
    // });

    // console.log(availableRoomNumber);
    return null;
  }

  /*
Function for creating random availability of numbers in a hotel and getDate from present
 */

  public dayAvailabilityOfRoom(daysNumber: number): IBookingDates[] {
    const datesRange: IBookingDates[] = [];
    const startDate = new Date();
    for (let i = 0; i < daysNumber; i++) {
      const bookedDay = new Date(startDate.setDate(startDate.getDate() + 1))
        .toISOString()
        .split('T')[0];
      const availability = Math.random() < 0.5;
      datesRange.push({ bookedDay, availability });
    }
    return datesRange;
  }
}
