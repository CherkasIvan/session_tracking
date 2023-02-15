import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRoomDto } from 'src/controller/hotel-rooms/dto/book-room.dto';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageRoomsService {
  constructor(
    @InjectRepository(HotelRoomsEntity)
    private readonly roomsRepository: Repository<HotelRoomsEntity>,
  ) {}

  async getAllRooms(): Promise<any[]> {
    const allRooms = await this.roomsRepository.find();
    allRooms.forEach((el) => {
      el.bookingDates = JSON.parse(el.bookingDates);
    });
    return allRooms;
  }

  async getAvailable(roomNumber: number, searchDates: string): Promise<any> {
    const allRooms = await this.getAllRooms();
    allRooms.forEach((el) => {
      el.bookingDates = el.bookingDates.filter((el) => el.availability);
    });

    if (searchDates) {
      const availableByDate: number[] = [];
      allRooms.forEach((room) => {
        room.bookingDates.filter((booked) => {
          if (booked.bookedDay === searchDates) {
            availableByDate.push(room.room_number);
          }
        });
      });
      console.log(availableByDate);
      return availableByDate;
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

  async bookingRoom(bookRoomDto: BookRoomDto): Promise<any> {
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
}
