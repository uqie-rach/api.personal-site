import { ExperiencesModule } from '../experiences/experiences.module';
import { PortfoliosModule } from '../portfolios/portfolios.module';
import { BlogsModule } from '../blogs/blogs.module';
import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [
    forwardRef(() => ExperiencesModule),

    forwardRef(() => PortfoliosModule),

    forwardRef(() => BlogsModule),

    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
