import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsPositive } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Room number',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  roomNumber: number;
}
