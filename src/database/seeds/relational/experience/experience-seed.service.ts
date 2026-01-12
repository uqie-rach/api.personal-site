import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceEntity } from '../../../../experiences/infrastructure/persistence/relational/entities/experience.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Repository } from 'typeorm';
import { workStyle } from '../../../../experiences/experiences.enum';

@Injectable()
export class ExperienceSeedService {
  constructor(
    @InjectRepository(ExperienceEntity)
    private repository: Repository<ExperienceEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const user = await this.userRepository.findOne({
        where: { email: 'admin@example.com' },
      });

      if (!user) {
        return;
      }

      const experiences = [
        {
          title: 'Fullstack AI Engineer',
          company: 'Kazokku | Tukar.ai',
          location: 'Brunei',
          startDate: 'Jul 2025',
          endDate: 'Sep 2025',
          isCurrently: false,
          workStyle: workStyle.PT,
          description: [
            'Architected and developed AI-powered mobile app (React Native) with NestJS backend and custom ML engine using Python + FastAPI. Designed end-to-end system workflow including prompt routing and model engine orchestration.',
            'Successfully delivered full-stack AI solution with integrated ML pipeline and mobile client.'
          ],
          order: 1,
          ownedBy: user,
        },
        {
          title: 'Fullstack AI Engineer',
          company: 'PT. Aira Teknologi Indonesia | Bikinkonten.ai',
          location: 'Malang, Indonesia',
          startDate: 'Apr 2025',
          endDate: 'Dec 2025',
          isCurrently: false,
          workStyle: workStyle.PT,
          description: [
            'Architected and developed B2B features for AI content generation platform. Integrated Google Gemini API for text, image, and video generation workflows.',
            'Built scalable content generation system with multi-modal AI integration.'
          ],
          order: 2,
          ownedBy: user,
        },
        {
          title: 'Fullstack Engineer',
          company: 'Ekata Tech Indonesia',
          location: 'Malang, Indonesia',
          startDate: 'Apr 2025',
          endDate: 'Jan 2025',
          isCurrently: false,
          workStyle: workStyle.PT,
          description: [
            'Developed and deployed RESTful APIs with optimized database structure and backend logic. Implemented scalable backend architecture and CI/CD pipelines.',
            'Increased API performance by ~30% through optimized queries and improved database indexing strategy.'
          ],
          order: 3,
          ownedBy: user,
        },
        {
          title: 'Fullstack Engineer',
          company: 'Tenang AI',
          location: 'Yogyakarta, Indonesia',
          startDate: 'Aug 2024',
          endDate: 'Oct 2024',
          isCurrently: false,
          workStyle: workStyle.PT,
          description: [
            'Designed full system architecture and database schema. Applied island architecture and optimized UI rendering. Implemented advanced image optimization techniques.',
            'Improved page performance by ~85%, significantly reduced initial load time through image optimization.'
          ],
          order: 4,
          ownedBy: user,
        },
        {
          title: 'Software Engineer Intern',
          company: 'Zegasoft',
          location: 'South Jakarta, Indonesia',
          startDate: 'Mar 2024',
          endDate: 'Nov 2024',
          isCurrently: false,
          workStyle: workStyle.IN,
          description: [
            'Implemented Firebase Auth & Storage in React Native app. Designed PostgreSQL schema. Documented APIs for frontend team integration.',
            'Boosted query speed by ~25%, improved frontend development efficiency by ~15% through comprehensive API documentation.'
          ],
          order: 5,
          ownedBy: user,
        },
        {
          title: 'Frontend Developer Intern',
          company: 'Core Initiative Studio',
          location: 'Depok, Indonesia',
          startDate: 'Aug 2023',
          endDate: 'Sep 2024',
          isCurrently: false,
          workStyle: workStyle.IN,
          description: [
            'Built interactive e-commerce pages using Vue.js. Enhanced UX through smooth API-driven UI and dynamic product interaction.',
            'Delivered multiple feature-rich e-commerce pages with optimized performance and engaging user experience.'
          ],
          order: 6,
          ownedBy: user,
        },
      ];

      await this.repository.insert(experiences);
    }
  }
}
