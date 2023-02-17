import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from 'src/controller/hotel-rooms/dto/create-room.dto';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { Repository } from 'typeorm';
import { ReservedDatesEntity } from 'src/model/reserved-dates.entity';
import { AvailableDatesType } from 'src/interface/available-dates.type';
import { HotelRoomType } from 'src/interface/hotel-room.type';
import { ReserveRoomDto } from 'src/controller/hotel-rooms/dto/reserve-room.dto';

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
    const reservedRoom = await this.reservedDatesRepository.findOne({
      where: {
        arrivalDate: reserveRoom.arrivalDate,
        departureDate: reserveRoom.departureDate,
      },
    });
    console.log(reservedRoom);
    // date = await this.reservedDatesRepository.save(date);
    return date;
  }

  async findAllRooms(): Promise<HotelRoomType[]> {
    const allRooms = await this.hotelRoomsRepository.find();
    console.log(allRooms);
    return allRooms;
  }

  async findOneDateByRoomsNumber(query): Promise<AvailableDatesType[]> {
    const getByRoomNumber = await this.reservedDatesRepository.findBy({
      id: query.id,
    });
    console.log(getByRoomNumber);
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
