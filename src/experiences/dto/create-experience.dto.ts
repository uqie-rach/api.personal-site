import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsNotEmptyObject,
  IsArray,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateExperienceDto {
  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  ownedBy: UserDto;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  company: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  location: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  endDate?: string | null;

  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  isCurrently: boolean;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  workStyle: string;

  @ApiProperty({
    nullable: true,
    type: () => [String],
    isArray: true,
  })
  @IsArray()
  accomplishments: string[];

  @ApiProperty({
    required: true,
    type: () => Number,
    default: 0,
  })
  @IsNumber()
  order: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
