import {
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class DeleteFileDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  @Type(() => String)
  path: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
