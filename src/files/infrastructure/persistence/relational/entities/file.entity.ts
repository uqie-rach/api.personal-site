import {
  // typeorm decorators here
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { PortfolioEntity } from '../../../../../portfolios/infrastructure/persistence/relational/entities/portfolio.entity';

@Entity({ name: 'file' })
export class FileEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  publicUrl: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;
}
