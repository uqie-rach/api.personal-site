import { ApiProperty } from '@nestjs/swagger';

export class TechStack {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  category: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  icon: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  proficiency: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  order: number;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
