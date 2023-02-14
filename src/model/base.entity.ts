import { PrimaryGeneratedColumn } from 'typeorm';

/**
 * Base entity
 */
export abstract class BaseEntity {
  /**
   * Column "id"
   */
  @PrimaryGeneratedColumn('uuid')
  id?: string;
}
