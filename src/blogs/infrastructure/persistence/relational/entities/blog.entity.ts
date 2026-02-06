import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'blog',
})
export class BlogEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  description?: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: String,
  })
  title: string;

  @Column({
    nullable: false,
    type: String,
  })
  slug: string;

  @Column({
    nullable: false,
    type: String,
  })
  content: string;

  @Column({
    nullable: false,
    type: String,
  })
  coverImage: string;

  @Column({
    nullable: false,
    type: Boolean,
  })
  published: boolean;

  @Column({
    nullable: true,
    type: Date,
  })
  publishedAt?: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: false,
    type: Number,
    default: 0,
  })
  order: number;

  @Column({
    nullable: false,
    type: String,
  })
  tags: string;

  @ManyToOne(() => UserEntity, (parentEntity) => parentEntity.blogs, {
    eager: true,
    nullable: false,
  })
  createdBy: UserEntity;
}
