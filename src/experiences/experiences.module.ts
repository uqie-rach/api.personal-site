import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { RelationalExperiencePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),

    // do not remove this comment
    RelationalExperiencePersistenceModule,
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService, RelationalExperiencePersistenceModule],
})
export class ExperiencesModule {}
