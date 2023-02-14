import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from 'src/controller/hotel-rooms/dto/create-room.dto';
import { IHotelRoom } from 'src/interface/hotel-room.interface';
import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { NUMBER_OF_ROOMS } from 'src/utils/constants/constants';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  public roomsDefaultCounter = NUMBER_OF_ROOMS;
  public rooms: IHotelRoom[] = [];

  constructor(
    @InjectRepository(HotelRoomsEntity)
    private readonly roomsRepository: Repository<HotelRoomsEntity>,
  ) {}

  getRoom(room_number: number): Promise<HotelRoomsEntity> {
    return this.roomsRepository.findOneBy({ room_number });
  }

  async getAllRooms(): Promise<HotelRoomsEntity[]> {
    return await this.roomsRepository.find();
  }

  getAllAvailable(): Promise<HotelRoomsEntity[]> {
    return this.roomsRepository.findBy({ bookingDate: null });
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<HotelRoomsEntity> {
    const room = this.roomsRepository.create();
    room.room_number = createRoomDto.roomNumber;
    await this.roomsRepository.save(room);
    return room;
  }

  // getRooms() {
  //   for (let i = 1; i <= this.roomsDefaultCounter; i++) {
  //     const room = { room_number: i, isAvailable: Math.random() < 0.5 };
  //     this.rooms.push(room);
  //   }
  //   console.log(this.rooms);
  //   return this.rooms;
  // }

  // getRoom(room_number: number): any {
  //   this.rooms[room_number];
  // }
}
