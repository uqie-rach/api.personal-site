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

  @Column({
    nullable: false,
    type: String,
    array: true,
  })
  technologies: string[];

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
