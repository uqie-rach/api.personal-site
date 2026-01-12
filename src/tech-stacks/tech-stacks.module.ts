import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { TechStacksService } from './tech-stacks.service';
import { TechStacksController } from './tech-stacks.controller';
import { RelationalTechStackPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalTechStackPersistenceModule,
  ],
  controllers: [TechStacksController],
  providers: [TechStacksService],
  exports: [TechStacksService, RelationalTechStackPersistenceModule],
})
export class TechStacksModule {}
