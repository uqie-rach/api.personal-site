import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'tech_stack',
})
export class TechStackEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @Column({
    nullable: false,
    type: String,
  })
  category: string;

  @Column({
    nullable: false,
    type: String,
  })
  icon: string;

  @Column({
    nullable: false,
    type: String,
  })
  proficiency: string;

  @Column({
    nullable: false,
    type: Number,
  })
  order: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
