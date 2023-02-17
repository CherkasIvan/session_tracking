import { ApiProperty } from '@nestjs/swagger';

import { IsDate, IsNotEmpty, MinDate } from 'class-validator';

export class CreateDatesDto {
  @ApiProperty({
    description: 'Date start period',
    example: '2023-02-20',
  })
  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  arrivalDate: Date;

  @ApiProperty({
    description: 'Date end period',
    example: '2023-02-21',
  })
  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  departureDate: Date;
}
