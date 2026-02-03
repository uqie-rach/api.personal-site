import { UsersModule } from '../users/users.module';
import { TechStacksModule } from '../tech-stacks/tech-stacks.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { RelationalPortfolioPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),

    TechStacksModule,
    FilesModule,

    // do not remove this comment
    RelationalPortfolioPersistenceModule,
  ],
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
  exports: [PortfoliosService, RelationalPortfolioPersistenceModule],
})
export class PortfoliosModule {}
