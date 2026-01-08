import { ExperienceDto } from '../../experiences/dto/experience.dto';

import { PortfolioDto } from '../../portfolios/dto/portfolio.dto';

import { BlogDto } from '../../blogs/dto/blog.dto';

import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({
    required: false,
    type: () => [ExperienceDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ExperienceDto)
  @IsArray()
  experiences?: ExperienceDto[] | null;

  @ApiProperty({
    required: false,
    type: () => [PortfolioDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PortfolioDto)
  @IsArray()
  portfolios?: PortfolioDto[] | null;

  @ApiProperty({
    required: false,
    type: () => [BlogDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BlogDto)
  @IsArray()
  blogs?: BlogDto[] | null;

  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  lastName: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;
}
