import { User } from '../../users/domain/user';
import { TechStack } from '../../tech-stacks/domain/tech-stack';
import { ApiProperty } from '@nestjs/swagger';

export class Portfolio {
  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  ownedBy: User;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  description: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  image: string;

  @ApiProperty({
    type: () => [TechStack],
    nullable: false,
  })
  technologies: TechStack[];

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  liveUrl?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  repoUrl: string;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  featured: boolean;

  @ApiProperty({
    type: () => Number,
    nullable: false,
    default: 0,
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
