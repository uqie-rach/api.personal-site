import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechStackEntity } from '../../../../tech-stacks/infrastructure/persistence/relational/entities/tech-stack.entity';
import { TechStackSeedService } from './tech-stack-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TechStackEntity])],
  providers: [TechStackSeedService],
  exports: [TechStackSeedService],
})
export class TechStackSeedModule {}
