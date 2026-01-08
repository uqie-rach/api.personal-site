import { User } from '../../users/domain/user';
import { Tag } from '../../tags/domain/tag';
import { ApiProperty } from '@nestjs/swagger';

export class Blog {
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
    type: () => [Tag],
    nullable: false,
  })
  tags: Tag[];

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
  excerpt: string;

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
