import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'Room number',
    example: 1,
  })
  roomNumber: number;
}
