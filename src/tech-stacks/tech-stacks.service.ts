import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import { TechStackRepository } from './infrastructure/persistence/tech-stack.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { TechStack } from './domain/tech-stack';

@Injectable()
export class TechStacksService {
  constructor(
    // Dependencies here
    private readonly techStackRepository: TechStackRepository,
  ) {}

  async create(createTechStackDto: CreateTechStackDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.techStackRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createTechStackDto.name,

      category: createTechStackDto.category,

      icon: createTechStackDto.icon,

      proficiency: createTechStackDto.proficiency,

      order: createTechStackDto.order,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.techStackRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: TechStack['id']) {
    return this.techStackRepository.findById(id);
  }

  findByIds(ids: TechStack['id'][]) {
    return this.techStackRepository.findByIds(ids);
  }

  async update(
    id: TechStack['id'],

    updateTechStackDto: UpdateTechStackDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.techStackRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateTechStackDto.name,

      category: updateTechStackDto.category,

      icon: updateTechStackDto.icon,

      proficiency: updateTechStackDto.proficiency,

      order: updateTechStackDto.order,
    });
  }

  remove(id: TechStack['id']) {
    return this.techStackRepository.remove(id);
  }
}
