import { Module } from '@nestjs/common';
import { PortfolioRepository } from '../portfolio.repository';
import { PortfolioRelationalRepository } from './repositories/portfolio.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioEntity])],
  providers: [
    {
      provide: PortfolioRepository,
      useClass: PortfolioRelationalRepository,
    },
  ],
  exports: [PortfolioRepository],
})
export class RelationalPortfolioPersistenceModule {}
