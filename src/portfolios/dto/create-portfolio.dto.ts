import { FileDto } from '../../files/dto/file.dto';

import { PortfolioDto } from './portfolio.dto';

import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsNumber,
  IsBoolean,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreatePortfolioDto {
  @ApiProperty({
    required: false,
    type: () => FileDto,
  })
  @IsOptional()
  // @ValidateNested()
  // @IsNotEmptyObject()
  @Type(() => FileDto)
  image?: FileDto | null;

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
  description: string;

  @ApiProperty({
    required: true,
    type: () => [String],
  })
  @Type(() => String)
  @IsArray()
  technologies: string[];

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  liveUrl?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  repoUrl: string;

  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  featured: boolean;

  @ApiProperty({
    required: true,
    type: () => Number,
    default: 0,
  })
  @IsNumber()
  order: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
