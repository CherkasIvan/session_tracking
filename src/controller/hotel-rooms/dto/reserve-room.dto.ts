import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ReserveRoomDto {
  @ApiProperty({
    required: false,
    description: 'Room number that should be booked',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  roomsNumber: number;

  @ApiProperty({
    description: 'Booked start period',
    example: '2023-02-20',
  })
  @IsString()
  arrivalDate: string;

  @ApiProperty({
    description: 'Booked end period',
    example: '2023-02-21',
  })
  @IsString()
  departureDate: string;
}
