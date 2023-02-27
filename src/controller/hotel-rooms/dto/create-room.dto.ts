import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateRoomDto {
  @Transform((type) => type.valueOf())
  @IsNumber()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  @IsPositive({ message: 'Value must be positive' })
  @ApiProperty({
    description: 'Room number',
    example: 1,
  })
  roomNumber: number;
}
