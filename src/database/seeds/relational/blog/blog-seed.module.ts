import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from '../../../../blogs/infrastructure/persistence/relational/entities/blog.entity';
import { BlogSeedService } from './blog-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity, UserEntity])],
  providers: [BlogSeedService],
  exports: [BlogSeedService],
})
export class BlogSeedModule {}
