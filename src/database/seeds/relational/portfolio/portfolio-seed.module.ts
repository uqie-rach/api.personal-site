import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from '../../../../portfolios/infrastructure/persistence/relational/entities/portfolio.entity';
import { PortfolioSeedService } from './portfolio-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { TechStackEntity } from '../../../../tech-stacks/infrastructure/persistence/relational/entities/tech-stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioEntity, UserEntity, TechStackEntity])],
  providers: [PortfolioSeedService],
  exports: [PortfolioSeedService],
})
export class PortfolioSeedModule {}
