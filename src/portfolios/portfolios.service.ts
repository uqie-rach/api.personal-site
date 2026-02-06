import { FileType } from '../files/domain/file';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfolioRepository } from './infrastructure/persistence/portfolio.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Portfolio } from './domain/portfolio';
import { FilesService } from '../files/files.service';

@Injectable()
export class PortfoliosService {
  constructor(
    private readonly fileService: FilesService,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    // Dependencies here
    private readonly portfolioRepository: PortfolioRepository,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    // Do not remove comment below.
    // <creating-property />
    let image: FileType | null | undefined = undefined;

    if (createPortfolioDto.image) {
      const imageObject = await this.fileService.findById(
        createPortfolioDto.image.id,
      );
      if (!imageObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'notExists',
          },
        });
      }
      image = imageObject;
    } else if (createPortfolioDto.image === null) {
      image = null;
    }

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
      image,

      ownedBy,

      title: createPortfolioDto.title,

      description: createPortfolioDto.description,

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
    let image: FileType | null | undefined = undefined;

    if (updatePortfolioDto.image) {
      const imageObject = await this.fileService.findById(
        updatePortfolioDto.image.id,
      );

      if (!imageObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'notExists',
          },
        });
      }
      image = imageObject;
    } else if (updatePortfolioDto.image === null) {
      image = null;
    }

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
      image,

      ownedBy,

      title: updatePortfolioDto.title,

      description: updatePortfolioDto.description,

      technologies: updatePortfolioDto.technologies,

      liveUrl: updatePortfolioDto.liveUrl,

      repoUrl: updatePortfolioDto.repoUrl,

      featured: updatePortfolioDto.featured,

      order: updatePortfolioDto.order,
    });
  }

  async _delete(id: Portfolio['id']) {
    // Find portfolio to be deleted
    const toBeRemoved = await this.portfolioRepository.findById(id);

    // If not exist, throw an exception
    if (!toBeRemoved) {
      throw new NotFoundException("Portfolio doesn't exist");
    }

    // Delete image from storage and database first
    // Fail-safe: jika image deletion gagal, portfolio tidak akan terhapus
    if (toBeRemoved.image?.path) {
      try {
        await this.fileService._delete(toBeRemoved.image.path);
      } catch (error) {
        throw new UnprocessableEntityException(
          `Failed to delete portfolio image: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
        );
      }
    }

    // Delete portfolio only after image is successfully deleted
    await this.portfolioRepository.remove(id);
  }
}
