import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from '../../../../experiences/infrastructure/persistence/relational/entities/experience.entity';
import { ExperienceSeedService } from './experience-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceEntity, UserEntity])],
  providers: [ExperienceSeedService],
  exports: [ExperienceSeedService],
})
export class ExperienceSeedModule {}
