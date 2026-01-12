import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TechStackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
