import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from '../../../../portfolios/infrastructure/persistence/relational/entities/portfolio.entity';
import { TechStackEntity } from '../../../../tech-stacks/infrastructure/persistence/relational/entities/tech-stack.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioSeedService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private repository: Repository<PortfolioEntity>,
    @InjectRepository(TechStackEntity)
    private techStackRepository: Repository<TechStackEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const user = await this.userRepository.findOne({
        where: { email: 'admin@example.com' },
      });

      if (!user) {
        return;
      }

      const projectsData = [
        {
          title: 'Tukar AI App (Fullstack Multiplatform)',
          description:
            'Full-stack AI solution featuring React Native mobile client, NestJS backend, and custom ML engine using Python + FastAPI. Includes prompt routing and model orchestration for AI-powered features.',
          technologies: [
            'PostgreSQL',
            'Next.js',
            'React Native',
            'Redis',
            'Docker',
            'Jenkins',
            'FastApi',
          ],
          image: null,
          ownedBy: user,
          liveUrl: 'https://tukar-translate.my.id',
          repoUrl: 'https://tukar-translate.my.id',
          featured: true,
          order: 1,
        },
        {
          title: 'Bikinkonten.AI - B2B AI Content Generation Platform',
          description:
            'Scalable B2B platform for AI-powered content generation supporting text, image, and video generation. Integrated Google Gemini API with multi-modal workflows and comprehensive content management system.',
          technologies: [
            'Next.js',
            'Zustand',
            'NestJS',
            'PostgreSQL',
            'Jenkins',
            'Docker',
            'K6',
            'Generative AI',
          ],
          image: null,
          ownedBy: user,
          liveUrl: 'https://www.bikinkonten.ai',
          repoUrl: 'https://www.bikinkonten.ai',
          featured: true,
          order: 2,
        },
        {
          title: 'Tenang AI Web Application',
          description:
            'Modern web application featuring island architecture and advanced image optimization. Achieved 85% performance improvement through UI rendering optimization and intelligent asset loading.',
          technologies: [
            'Angular',
            'Astro.js',
            'Nginx',
            'Tailwind CSS',
            'Docker',
            'Jenkins',
          ],
          image: null,
          ownedBy: user,
          liveUrl: 'https://tenang.ai/',
          repoUrl: 'https://tenang.ai/',
          featured: true,
          order: 4,
        },
        {
          title: 'JKI Tiberias Mobile App',
          description:
            'Cross-platform React Native application with Firebase Authentication and Storage integration. Features optimized PostgreSQL schema design and comprehensive API documentation for seamless frontend integration.',
          technologies: ['React Native', 'Firebase', 'NoSQL'],
          image: null,
          ownedBy: user,
          liveUrl: 'https://www.uqie.my.id',
          repoUrl: 'https://www.uqie.my.id',
          featured: false,
          order: 5,
        },
        {
          title: 'Gudangorder - E-Commerce Platform',
          description:
            'Feature-rich e-commerce platform built with Vue.js featuring dynamic product interactions, smooth API-driven UI, and optimized performance. Delivers engaging user experience with modern web technologies.',
          technologies: ['Next.js', 'Zustand', 'Tailwind CSS'],
          image: null,
          ownedBy: user,
          liveUrl: 'http://gudangorder-fe-test.vercel.app',
          repoUrl: 'http://gudangorder-fe-test.vercel.app',
          featured: false,
          order: 6,
        },
      ];

      await this.repository.insert(projectsData);
    }
  }
}
