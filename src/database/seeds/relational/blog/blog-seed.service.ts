import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from '../../../../blogs/infrastructure/persistence/relational/entities/blog.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserRepository } from '../../../../users/infrastructure/persistence/user.repository';

@Injectable()
export class BlogSeedService {
  constructor(
    @InjectRepository(BlogEntity)
    private repository: Repository<BlogEntity>,
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

      const blogs = [
        {
          createdBy: user,
          title: 'Building Scalable Applications with Next.js',
          slug: 'building-scalable-applications',
          published: false,
          coverImage: "www",
          readTime: 8,
          author: 'Uqie',
          content: `
        <h2>Introduction</h2>
        <p>
          Building scalable applications requires careful planning and architectural decisions. 
          Next.js provides powerful tools to help you create applications that grow with your needs.
        </p>
        
        <h2>Server Components</h2>
        <p>
          React Server Components revolutionize how we think about data fetching and rendering. 
          They allow you to fetch data directly in components without creating API routes.
        </p>
        
        <h3>Benefits</h3>
        <ul>
          <li>Direct database access</li>
          <li>Reduced bundle size</li>
          <li>Better security</li>
          <li>Simplified data fetching</li>
        </ul>
        
        <h2>Caching Strategies</h2>
        <p>
          Implementing proper caching is crucial for performance. Next.js offers multiple caching layers
          including static generation, incremental static regeneration, and dynamic rendering.
        </p>
      `,
        },
        {
          createdBy: user,
          title: 'React Performance Optimization Tips',
          slug: 'react-performance-optimization',
          published: false,
          coverImage: "www",
          readTime: 6,
          author: 'Uqie',
          content: `
        <h2>Performance Matters</h2>
        <p>
          React applications can become slow as they grow. Understanding performance profiling and optimization
          techniques is essential for maintaining responsive applications.
        </p>
        
        <h2>Key Optimization Techniques</h2>
        <h3>Code Splitting</h3>
        <p>Break your application into smaller chunks that load only when needed.</p>
        
        <h3>Memoization</h3>
        <p>Use React.memo and useMemo to prevent unnecessary re-renders.</p>
        
        <h3>Lazy Loading</h3>
        <p>Defer loading of components and assets until they're needed.</p>
      `,
        },
      ];
      await this.repository.insert(blogs);
    }
  }
}
