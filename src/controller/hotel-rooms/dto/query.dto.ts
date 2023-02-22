import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  @ApiProperty({
    description: 'Room number',
    example: 1,
  })
  roomNumber: string;
}
