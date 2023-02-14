import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

/**
 * Account Entity
 */
@Entity({ name: 'hotel-rooms' })
export class HotelRoomsEntity extends BaseEntity {
  /**
   * Get client by id
   * @param room_id Room id string
   */

  @Column()
  room_number!: number;

  @Column()
  bookingDates: string;
}
