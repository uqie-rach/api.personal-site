import { UsersModule } from '../users/users.module';
import { TagsModule } from '../tags/tags.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { RelationalBlogPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),

    TagsModule,

    // do not remove this comment
    RelationalBlogPersistenceModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService, RelationalBlogPersistenceModule],
})
export class BlogsModule {}
