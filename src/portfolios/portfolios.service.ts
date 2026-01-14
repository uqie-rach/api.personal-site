import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

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

    return this.portfolioRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ownedBy,

      title: createPortfolioDto.title,

      description: createPortfolioDto.description,

      image: createPortfolioDto.image,

      technologies: createPortfolioDto.technologies,

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

    return this.portfolioRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ownedBy,

      title: updatePortfolioDto.title,

      description: updatePortfolioDto.description,

      image: updatePortfolioDto.image,

      technologies: updatePortfolioDto.technologies,

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
