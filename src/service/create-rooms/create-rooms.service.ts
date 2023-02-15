import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from 'src/controller/create-rooms/dto/create-room.dto';
import { IBookingDates } from 'src/interface/booking-dates.interface';
import { IHotelRoom } from 'src/interface/hotel-room.interface';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateRoomsService {
  constructor(
    @InjectRepository(HotelRoomsEntity)
    private readonly hotelRoomsRepository: Repository<HotelRoomsEntity>,
  ) {}

  async createDefaultRooms(
    createRoomDto: CreateRoomDto,
  ): Promise<HotelRoomsEntity[]> {
    await this.hotelRoomsRepository.clear();
    const rooms: IHotelRoom[] = [];
    for (let i = 1; i <= createRoomDto.roomNumber; i++) {
      const room: IHotelRoom = {
        room_number: i,
        bookingDates: JSON.stringify(
          this.dayAvailabilityOfRoom(createRoomDto.searchDates),
        ),
      };
      rooms.push(room);
      await this.hotelRoomsRepository.save(room);
    }
    return rooms;
  }

  /*
Function for creating random availability of numbers in a hotel and getDate from present
 */

  public dayAvailabilityOfRoom(daysNumber: number): IBookingDates[] {
    const datesRange: IBookingDates[] = [];
    const startDate: Date = new Date();
    for (let i = 0; i < daysNumber; i++) {
      const bookedDay: string = new Date(
        startDate.setDate(startDate.getDate() + 1),
      )
        .toISOString()
        .split('T')[0];
      const availability: boolean = Math.random() < 0.5;
      datesRange.push({ bookedDay, availability });
    }
    return datesRange;
  }
}
