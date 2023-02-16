import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateDatesDto {
  @ApiProperty({
    description: 'Date start period',
    example: '2023-02-20',
  })
  @IsString()
  arrivalDate: string;

  @ApiProperty({
    description: 'Date end period',
    example: '2023-02-21',
  })
  @IsString()
  departureDate: string;
}
