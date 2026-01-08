import { Module } from '@nestjs/common';
import { TechStackRepository } from '../tech-stack.repository';
import { TechStackRelationalRepository } from './repositories/tech-stack.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechStackEntity } from './entities/tech-stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechStackEntity])],
  providers: [
    {
      provide: TechStackRepository,
      useClass: TechStackRelationalRepository,
    },
  ],
  exports: [TechStackRepository],
})
export class RelationalTechStackPersistenceModule {}
