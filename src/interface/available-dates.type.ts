import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';

export type AvailableDatesType = {
  arrivalDate: string;
  departureDate: string;
  room: HotelRoomsEntity;
};
