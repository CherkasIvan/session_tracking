import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  @IsPositive({ message: 'Value must be positive' })
  @ApiProperty({
    description: 'Room number',
    example: 1,
  })
  roomNumber: number;
}
