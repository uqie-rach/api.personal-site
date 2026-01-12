import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Experience {
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
  company: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  location: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  startDate: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  endDate?: string | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  isCurrently: boolean;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  workStyle: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  description: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  accomplishments?: string | null;

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
