import { ExperienceEntity } from '../../../../../experiences/infrastructure/persistence/relational/entities/experience.entity';

import { PortfolioEntity } from '../../../../../portfolios/infrastructure/persistence/relational/entities/portfolio.entity';

import { BlogEntity } from '../../../../../blogs/infrastructure/persistence/relational/entities/blog.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import { AuthProvidersEnum } from '../../../../../auth/auth-providers.enum';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper {
  @OneToMany(() => ExperienceEntity, (childEntity) => childEntity.ownedBy, {
    eager: true,
    nullable: true,
  })
  experiences?: ExperienceEntity[] | null;

  @OneToMany(() => PortfolioEntity, (childEntity) => childEntity.ownedBy, {
    eager: true,
    nullable: true,
  })
  portfolios?: PortfolioEntity[] | null;

  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  socialId?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  photo?: FileEntity | null;

  @ManyToOne(() => RoleEntity, {
    eager: true,
  })
  role?: RoleEntity | null;

  @OneToMany(() => BlogEntity, (childEntity) => childEntity.createdBy, {
    eager: true,
    nullable: true,
  })
  blogs?: BlogEntity[] | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
  })
  status?: StatusEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
