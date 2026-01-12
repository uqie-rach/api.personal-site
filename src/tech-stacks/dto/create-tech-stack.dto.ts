import {
  // decorators here

  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateTechStackDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  category: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  icon: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  proficiency: string;

  @ApiProperty({
    required: true,
    type: () => Number,
    default: 0,
  })
  @IsNumber()
  order: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
