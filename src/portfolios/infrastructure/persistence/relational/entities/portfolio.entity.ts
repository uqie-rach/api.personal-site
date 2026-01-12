import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import { TechStackEntity } from '../../../../../tech-stacks/infrastructure/persistence/relational/entities/tech-stack.entity';

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
  name: 'portfolio',
})
export class PortfolioEntity extends EntityRelationalHelper {
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
  description: string;

  @Column({
    nullable: false,
    type: String,
  })
  image: string;

  @ManyToMany(() => TechStackEntity, { eager: true, nullable: false })
  @JoinTable()
  technologies: TechStackEntity[];

  @Column({
    nullable: true,
    type: String,
  })
  liveUrl?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  repoUrl: string;

  @Column({
    nullable: false,
    type: Boolean,
  })
  featured: boolean;

  @Column({
    nullable: false,
    type: Number,
    default: 0,
  })
  order: number;

  @ManyToOne(() => UserEntity, (parentEntity) => parentEntity.portfolios, {
    eager: false,
    nullable: false,
  })
  ownedBy: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
