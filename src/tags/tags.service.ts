import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './infrastructure/persistence/tag.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Tag } from './domain/tag';

@Injectable()
export class TagsService {
  constructor(
    // Dependencies here
    private readonly tagRepository: TagRepository,
  ) {}

  async create(createTagDto: CreateTagDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.tagRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createTagDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.tagRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Tag['id']) {
    return this.tagRepository.findById(id);
  }

  findByIds(ids: Tag['id'][]) {
    return this.tagRepository.findByIds(ids);
  }

  async update(
    id: Tag['id'],

    updateTagDto: UpdateTagDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.tagRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateTagDto.name,
    });
  }

  remove(id: Tag['id']) {
    return this.tagRepository.remove(id);
  }
}
