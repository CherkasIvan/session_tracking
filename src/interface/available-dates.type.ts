import { HotelRoomsEntity } from 'src/model/hotel-rooms.entity';

export type AvailableDatesType = {
  arrival_date: Date;
  departure_date: Date;
  room: HotelRoomsEntity;
};
