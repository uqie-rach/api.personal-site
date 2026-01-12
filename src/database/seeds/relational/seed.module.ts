import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../../typeorm-config.service';
import { RoleSeedModule } from './role/role-seed.module';
import { StatusSeedModule } from './status/status-seed.module';
import { UserSeedModule } from './user/user-seed.module';
import databaseConfig from '../../config/database.config';
import appConfig from '../../../config/app.config';

import { TagSeedModule } from './tag/tag-seed.module';

import { TechStackSeedModule } from './tech-stack/tech-stack-seed.module';

import { ExperienceSeedModule } from './experience/experience-seed.module';

import { BlogSeedModule } from './blog/blog-seed.module';

import { PortfolioSeedModule } from './portfolio/portfolio-seed.module';

@Module({
  imports: [
    PortfolioSeedModule,
    BlogSeedModule,
    ExperienceSeedModule,
    TechStackSeedModule,
    TagSeedModule,
    RoleSeedModule,
    StatusSeedModule,
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
