import { UserDto } from '../../users/dto/user.dto';

import { TagDto } from '../../tags/dto/tag.dto';

import {
  // decorators here

  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsDate,
  IsBoolean,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

export class CreateBlogDto {
  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  createdBy: UserDto;

  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  published: boolean;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  publishedAt?: Date | null;

  @ApiProperty({
    required: true,
    type: () => Number,
    default: 0,
  })
  @IsNumber()
  order: number;

  @ApiProperty({
    required: true,
    type: () => [TagDto],
  })
  @ValidateNested()
  @Type(() => TagDto)
  @IsArray()
  tags: TagDto[];

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  coverImage: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  content: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  slug: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  title: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
