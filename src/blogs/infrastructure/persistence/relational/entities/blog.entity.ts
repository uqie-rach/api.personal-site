import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import { TagEntity } from '../../../../../tags/infrastructure/persistence/relational/entities/tag.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'blog',
})
export class BlogEntity extends EntityRelationalHelper {
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
  excerpt: string;

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
  })
  order: number;

  @ManyToMany(() => TagEntity, { eager: true, nullable: false })
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(() => UserEntity, (parentEntity) => parentEntity.blogs, {
    eager: false,
    nullable: false,
  })
  createdBy: UserEntity;
}
