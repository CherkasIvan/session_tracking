import { ApiProperty } from '@nestjs/swagger';

import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MinDate,
} from 'class-validator';

export class ReserveRoomDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  @IsPositive({ message: 'Value must be positive' })
  @ApiProperty({
    description: 'Room number that should be booked',
    example: 1,
  })
  roomNumber: number;

  @IsDateString()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  // @MinDate(new Date())
  @ApiProperty({
    description: 'Booked start period',
    example: '2023-02-20',
  })
  arrivalDate: Date;

  @IsDateString()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  // @MinDate(new Date())
  @ApiProperty({
    description: 'Booked end period',
    example: '2023-02-21',
  })
  departureDate: Date;
}
