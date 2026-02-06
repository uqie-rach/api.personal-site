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
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ExperienceRepository } from './infrastructure/persistence/experience.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Experience } from './domain/experience';

@Injectable()
export class ExperiencesService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    // Dependencies here
    private readonly experienceRepository: ExperienceRepository,
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    // Do not remove comment below.
    // <creating-property />
    const ownedByObject = await this.userService.findById(
      createExperienceDto.ownedBy.id,
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

    return this.experienceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ownedBy,

      title: createExperienceDto.title,

      company: createExperienceDto.company,

      location: createExperienceDto.location,

      startDate: createExperienceDto.startDate,

      endDate: createExperienceDto.endDate,

      isCurrently: createExperienceDto.isCurrently,

      workStyle: createExperienceDto.workStyle,

      accomplishments: createExperienceDto.accomplishments,

      order: createExperienceDto.order,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.experienceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Experience['id']) {
    return this.experienceRepository.findById(id);
  }

  findByIds(ids: Experience['id'][]) {
    return this.experienceRepository.findByIds(ids);
  }

  async update(
    id: Experience['id'],

    updateExperienceDto: UpdateExperienceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let ownedBy: User | undefined = undefined;

    if (updateExperienceDto.ownedBy) {
      const ownedByObject = await this.userService.findById(
        updateExperienceDto.ownedBy.id,
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

    return this.experienceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ownedBy,

      title: updateExperienceDto.title,

      company: updateExperienceDto.company,

      location: updateExperienceDto.location,

      startDate: updateExperienceDto.startDate,

      endDate: updateExperienceDto.endDate,

      isCurrently: updateExperienceDto.isCurrently,

      workStyle: updateExperienceDto.workStyle,

      accomplishments: updateExperienceDto.accomplishments,

      order: updateExperienceDto.order,
    });
  }

  remove(id: Experience['id']) {
    return this.experienceRepository.remove(id);
  }
}
