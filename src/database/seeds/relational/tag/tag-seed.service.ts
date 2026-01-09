import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../../../../tags/infrastructure/persistence/relational/entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagSeedService {
  constructor(
    @InjectRepository(TagEntity)
    private repository: Repository<TagEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();
    const tags = [
      'Frontend',
      'Performance',
      'React.js',
      'Next.js',
      'Backend',
      'DevOps',
      'Nest.js',
      'UI/UX',
      'UI/UX',
      'Software Engineer',
      'System Design',
      'Docker',
    ];
    if (count === 0) {
      await this.repository.insert([...tags.map((tag) => ({ name: tag }))]);
    }
  }
}
