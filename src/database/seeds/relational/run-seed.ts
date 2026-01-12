import { NestFactory } from '@nestjs/core';
import { PortfolioSeedService } from './portfolio/portfolio-seed.service';
import { BlogSeedService } from './blog/blog-seed.service';
import { ExperienceSeedService } from './experience/experience-seed.service';
import { TechStackSeedService } from './tech-stack/tech-stack-seed.service';
import { TagSeedService } from './tag/tag-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();

  await app.get(TagSeedService).run();

  await app.get(TechStackSeedService).run();

  await app.get(ExperienceSeedService).run();

  await app.get(BlogSeedService).run();

  await app.get(PortfolioSeedService).run();

  await app.close();
};

void runSeed();
