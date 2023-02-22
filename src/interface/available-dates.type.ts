import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';

export type AvailableDatesType = {
  arrivalDate: Date;
  departureDate: Date;
  room: HotelRoomsEntity;
};
