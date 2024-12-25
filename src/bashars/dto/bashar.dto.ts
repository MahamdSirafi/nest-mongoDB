import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BasharDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
