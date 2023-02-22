import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ReservedDatesEntity } from './reserved-dates.entity';

/**
 * Account Entity
 */
@Entity({ name: 'hotel_rooms' })
export class HotelRoomsEntity extends BaseEntity {
  /**
   * Get room by id
   * @param room_id Room id string
   */

  @Column({ unique: true })
  roomNumber!: number;

  @OneToMany((type) => ReservedDatesEntity, (reservation) => reservation.room)
  reservations?: ReservedDatesEntity[];
}
