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
  name: 'experience',
})
export class ExperienceEntity extends EntityRelationalHelper {
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
  company: string;

  @Column({
    nullable: false,
    type: String,
  })
  location: string;

  @Column({
    nullable: false,
    type: String,
  })
  startDate: string;

  @Column({
    nullable: true,
    type: String,
  })
  endDate?: string | null;

  @Column({
    nullable: false,
    type: Boolean,
  })
  isCurrently: boolean;

  @Column({
    nullable: false,
    type: String,
  })
  workStyle: string;

  @Column({
    nullable: true,
    type: String,
    array: true,
  })
  accomplishments: string[];

  @Column({
    nullable: false,
    type: Number,
    default: 0,
  })
  order: number;

  @ManyToOne(() => UserEntity, (parentEntity) => parentEntity.experiences, {
    eager: false,
    nullable: false,
  })
  ownedBy: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
