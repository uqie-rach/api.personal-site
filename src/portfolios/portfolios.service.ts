import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { TechStacksService } from '../tech-stacks/tech-stacks.service';
import { TechStack } from '../tech-stacks/domain/tech-stack';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfolioRepository } from './infrastructure/persistence/portfolio.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Portfolio } from './domain/portfolio';

@Injectable()
export class PortfoliosService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private readonly techStackService: TechStacksService,

    // Dependencies here
    private readonly portfolioRepository: PortfolioRepository,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    // Do not remove comment below.
    // <creating-property />
    const ownedByObject = await this.userService.findById(
      createPortfolioDto.ownedBy.id,
    );
    if (!ownedByObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          ownedBy: 'notExists',
        },
      });
    }
    const ownedBy = ownedByObject;

    const technologiesObjects = await this.techStackService.findByIds(
      createPortfolioDto.technologies.map((entity) => entity.id),
    );
    if (technologiesObjects.length !== createPortfolioDto.technologies.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          technologies: 'notExists',
        },
      });
    }
    const technologies = technologiesObjects;

    return this.portfolioRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ownedBy,

      title: createPortfolioDto.title,

      description: createPortfolioDto.description,

      image: createPortfolioDto.image,

      technologies,

      liveUrl: createPortfolioDto.liveUrl,

      repoUrl: createPortfolioDto.repoUrl,

      featured: createPortfolioDto.featured,

      order: createPortfolioDto.order,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.portfolioRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Portfolio['id']) {
    return this.portfolioRepository.findById(id);
  }

  findByIds(ids: Portfolio['id'][]) {
    return this.portfolioRepository.findByIds(ids);
  }

  async update(
    id: Portfolio['id'],

    updatePortfolioDto: UpdatePortfolioDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let ownedBy: User | undefined = undefined;

    if (updatePortfolioDto.ownedBy) {
      const ownedByObject = await this.userService.findById(
        updatePortfolioDto.ownedBy.id,
      );
      if (!ownedByObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            ownedBy: 'notExists',
          },
        });
      }
      ownedBy = ownedByObject;
    }

    let technologies: TechStack[] | undefined = undefined;

    if (updatePortfolioDto.technologies) {
      const technologiesObjects = await this.techStackService.findByIds(
        updatePortfolioDto.technologies.map((entity) => entity.id),
      );
      if (
        technologiesObjects.length !== updatePortfolioDto.technologies.length
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            technologies: 'notExists',
          },
        });
      }
      technologies = technologiesObjects;
    }

    return this.portfolioRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ownedBy,

      title: updatePortfolioDto.title,

      description: updatePortfolioDto.description,

      image: updatePortfolioDto.image,

      technologies,

      liveUrl: updatePortfolioDto.liveUrl,

      repoUrl: updatePortfolioDto.repoUrl,

      featured: updatePortfolioDto.featured,

      order: updatePortfolioDto.order,
    });
  }

  remove(id: Portfolio['id']) {
    return this.portfolioRepository.remove(id);
  }
}
