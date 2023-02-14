import { ApiOperation } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  //   @ApiOperation({ summary: 'Get Rooms' })

  @Column()
  room_number!: number;

  @Column({ type: 'date', nullable: true })
  bookingDate: string;
}
