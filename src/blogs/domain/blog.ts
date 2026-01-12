import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Blog {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  description?: string;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  createdBy: User;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  published: boolean;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  publishedAt?: Date | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
    default: 0,
  })
  order: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  tags: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  coverImage: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  content: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  slug: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
