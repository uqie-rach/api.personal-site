import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from '../../../../portfolios/infrastructure/persistence/relational/entities/portfolio.entity';
import { TechStackEntity } from '../../../../tech-stacks/infrastructure/persistence/relational/entities/tech-stack.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Repository, In } from 'typeorm';

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
          title: 'Tukar AI App',
          description:
            'Full-stack AI solution featuring React Native mobile client, NestJS backend, and custom ML engine using Python + FastAPI. Includes prompt routing and model orchestration for AI-powered features.',
          techStackNames: [
            'React Native',
            'NestJS',
            'Python',
            'FastAPI',
            'TypeScript',
          ],
          liveUrl: null,
          repoUrl: '#',
          featured: true,
          order: 1,
        },
        {
          title: 'Bikinkonten.AI - B2B AI Content Generation Platform',
          description:
            'Scalable B2B platform for AI-powered content generation supporting text, image, and video generation. Integrated Google Gemini API with multi-modal workflows and comprehensive content management system.',
          techStackNames: [
            'Next.js',
            'NestJS',
            'PostgreSQL',
            'TypeScript',
            'React',
          ],
          liveUrl: '#',
          repoUrl: '#',
          featured: true,
          order: 2,
        },
        {
          title: 'Tukar AI API',
          description:
            'Enterprise-grade REST API with optimized database architecture and scalable backend logic. Implemented CI/CD pipelines and improved query performance through advanced indexing strategies.',
          techStackNames: ['NestJS', 'PostgreSQL', 'TypeScript', 'Docker'],
          liveUrl: null,
          repoUrl: '#',
          featured: false,
          order: 3,
        },
        {
          title: 'Performance-Optimized Web Application',
          description:
            'Modern web application featuring island architecture and advanced image optimization. Achieved 85% performance improvement through UI rendering optimization and intelligent asset loading.',
          techStackNames: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
          liveUrl: '#',
          repoUrl: '#',
          featured: true,
          order: 4,
        },
        {
          title: 'Firebase-Powered React Native App',
          description:
            'Cross-platform React Native application with Firebase Authentication and Storage integration. Features optimized PostgreSQL schema design and comprehensive API documentation for seamless frontend integration.',
          techStackNames: [
            'React Native',
            'Firebase',
            'PostgreSQL',
            'JavaScript',
          ],
          liveUrl: null,
          repoUrl: '#',
          featured: false,
          order: 5,
        },
        {
          title: 'Gudangorder - E-Commerce Platform',
          description:
            'Feature-rich e-commerce platform built with Vue.js featuring dynamic product interactions, smooth API-driven UI, and optimized performance. Delivers engaging user experience with modern web technologies.',
          techStackNames: ['Vue.js', 'JavaScript', 'Tailwind CSS'],
          liveUrl: '#',
          repoUrl: '#',
          featured: false,
          order: 6,
        },
      ];

      for (const projectData of projectsData) {
        const techStacks = await this.techStackRepository.find({
          where: {
            name: In(projectData.techStackNames),
          },
        });

        await this.repository.save(
          this.repository.create({
            title: projectData.title,
            description: projectData.description,
            image: '#',
            technologies: techStacks,
            liveUrl: projectData.liveUrl,
            repoUrl: projectData.repoUrl,
            featured: projectData.featured,
            order: projectData.order,
            ownedBy: user,
          }),
        );
      }
    }
  }
}
