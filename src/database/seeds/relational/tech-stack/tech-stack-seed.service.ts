import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechStackEntity } from '../../../../tech-stacks/infrastructure/persistence/relational/entities/tech-stack.entity';
import { Repository } from 'typeorm';
import {
  category,
  proficiency,
} from '../../../../tech-stacks/tech-stacks.enum';

@Injectable()
export class TechStackSeedService {
  constructor(
    @InjectRepository(TechStackEntity)
    private repository: Repository<TechStackEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const techStacks = [
        {
          name: 'next.js',
          category: category.FE,
          icon: 'https://icon',
          proficiency: proficiency.Int,
          order: 0,
        },
        {
          name: 'nest.js',
          category: category.BE,
          icon: 'https://icon',
          proficiency: proficiency.Int,
          order: 0,
        },
        {
          name: 'react native',
          category: category.AN,
          icon: 'https://icon',
          proficiency: proficiency.Int,
          order: 0,
        },
        {
          name: 'firebase',
          category: category.Other,
          icon: 'https://icon',
          proficiency: proficiency.Beg,
          order: 0,
        },
        {
          name: 'redux',
          category: category.FE,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'fastapi',
          category: category.BE,
          icon: 'https://icon',
          proficiency: proficiency.Beg,
          order: 0,
        },
        {
          name: 'astro.js',
          category: category.FE,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'strapi.js',
          category: category.BE,
          icon: 'https://icon',
          proficiency: proficiency.Beg,
          order: 0,
        },
        {
          name: 'java',
          category: category.BE,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'mySQL',
          category: category.DB,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'mongo',
          category: category.DB,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'postgreSQL',
          category: category.DB,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'git',
          category: category.Utility,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'redis',
          category: category.DB,
          icon: 'https://icon',
          proficiency: proficiency.Beg,
          order: 0,
        },
        {
          name: 'tailwind',
          category: category.FE,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'docker',
          category: category.DevOps,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
        {
          name: 'angular',
          category: category.FE,
          icon: 'https://icon',
          proficiency: proficiency.Beg,
          order: 0,
        },
        {
          name: 'vue',
          category: category.FE,
          icon: 'https://icon',
          proficiency: proficiency.Beg,
          order: 0,
        },
        {
          name: 'jenkins',
          category: category.DevOps,
          icon: 'https://icon',
          proficiency: proficiency.Beg,
          order: 0,
        },
        {
          name: 'K6',
          category: category.Test,
          icon: 'https://icon',
          proficiency: proficiency.Beg,
          order: 0,
        },
        {
          name: 'jest',
          category: category.Test,
          icon: 'https://icon',
          proficiency: proficiency.Adv,
          order: 0,
        },
      ];

      await this.repository.insert(techStacks);
    }
  }
}
