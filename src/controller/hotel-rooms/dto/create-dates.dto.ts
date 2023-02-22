import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsNotEmpty, MinDate } from 'class-validator';

export class CreateDatesDto {
  @IsNotEmpty()
  @IsDateString()
  // @MinDate(new Date())
  @ApiProperty({
    description: 'Date start period',
    example: '2023-02-20',
  })
  arrivalDate: Date;

  @IsNotEmpty()
  @IsDateString()
  // @MinDate(new Date())
  @ApiProperty({
    description: 'Date end period',
    example: '2023-02-21',
  })
  departureDate: Date;
}
