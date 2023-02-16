import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';
import { HotelRoomType } from './hotel-room.type';

export type AvailableDatesType = {
  arrivalDate: string;
  departureDate: string;
  roomsNumber: HotelRoomType;
};
