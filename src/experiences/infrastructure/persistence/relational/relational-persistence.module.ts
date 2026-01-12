import { Module } from '@nestjs/common';
import { ExperienceRepository } from '../experience.repository';
import { ExperienceRelationalRepository } from './repositories/experience.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from './entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceEntity])],
  providers: [
    {
      provide: ExperienceRepository,
      useClass: ExperienceRelationalRepository,
    },
  ],
  exports: [ExperienceRepository],
})
export class RelationalExperiencePersistenceModule {}
