import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsNumber, IsPositive } from 'class-validator';

export class BookRoomDto {
  @ApiProperty({
    required: false,
    description: 'Room number that should be booked',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  roomNumber: number;

  @ApiProperty({
    required: false,
    description: 'Booking day in format YYYY-MM-DD',
    example: '2023-02-17',
  })
  @IsDateString()
  @IsPositive()
  searchDates?: string;
}
