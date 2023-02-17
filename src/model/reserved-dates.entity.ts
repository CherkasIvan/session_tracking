import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { HotelRoomsEntity } from './hotel-rooms.entity';

/**
 * Account Entity
 */
@Entity({ name: 'reservation-rooms' })
export class ReservedDatesEntity extends BaseEntity {
  /**
   * Get room by id
   * @param room_id Room id string
   */

  @Column()
  arrivalDate: string;

  @Column()
  departureDate: string;

  @ManyToOne((type) => HotelRoomsEntity, (room) => room.reservations)
  room: HotelRoomsEntity;
}
