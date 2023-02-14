import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async getAllAvailable(): Promise<HotelRoomsEntity[]> {
    const allRooms = await this.getAllRooms();
    allRooms.forEach((el) => {
      el.bookingDates = el.bookingDates.filter((el) => el.availability);
    });
    return allRooms;
  }

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
