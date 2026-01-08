import { UserDto } from '../../users/dto/user.dto';

import { TechStackDto } from '../../tech-stacks/dto/tech-stack.dto';

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
    type: () => String,
  })
  @IsString()
  image: string;

  @ApiProperty({
    required: true,
    type: () => [TechStackDto],
  })
  @ValidateNested()
  @Type(() => TechStackDto)
  @IsArray()
  technologies: TechStackDto[];

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
  })
  @IsNumber()
  order: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
