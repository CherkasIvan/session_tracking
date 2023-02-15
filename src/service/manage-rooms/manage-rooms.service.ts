import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRoomDto } from 'src/controller/hotel-rooms/dto/book-room.dto';
import { IHotelRoom } from 'src/interface/hotel-room.interface';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageRoomsService {
  constructor(
    @InjectRepository(HotelRoomsEntity)
    private readonly roomsRepository: Repository<any>,
  ) {}

  async getAllRooms(): Promise<any[]> {
    const allRooms = await this.roomsRepository.find();
    allRooms.forEach((el) => {
      el.bookingDates = JSON.parse(el.bookingDates);
    });
    return allRooms;
  }

  async getAvailable(roomNumber?: number, searchDates?: string): Promise<any> {
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
      return availableByDate;
    }

    if (roomNumber) {
      const roomsByNumbers = allRooms.find((room) => {
        if (room.room_number == roomNumber) {
          return room;
        }
      });
      return roomsByNumbers;
    } else {
      return allRooms;
    }
  }

  async bookingRoom(bookRoomDto: BookRoomDto): Promise<HotelRoomsEntity> {
    const allAvailableRooms = await this.getAvailable();
    const getByRoomNumber = await this.roomsRepository.findBy({
      room_number: bookRoomDto.roomNumber,
    });
    getByRoomNumber.forEach((el) => {
      el.bookingDates = JSON.parse(el.bookingDates);
    });

    let bookedRoom!: IHotelRoom;
    allAvailableRooms.find((roomNumber) => {
      if (roomNumber.room_number === bookRoomDto.roomNumber) {
        roomNumber.bookingDates.filter((booked) => {
          if (booked.bookedDay === bookRoomDto.searchDates) {
            booked.availability = false;
            bookedRoom = roomNumber;
            return bookedRoom;
          }
        });
      }
      return bookedRoom;
    });
    return bookedRoom;
  }
}
