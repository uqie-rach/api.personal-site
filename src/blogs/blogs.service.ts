import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { TagsService } from '../tags/tags.service';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './infrastructure/persistence/blog.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Blog } from './domain/blog';

@Injectable()
export class BlogsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private readonly tagService: TagsService,

    // Dependencies here
    private readonly blogRepository: BlogRepository,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    // Do not remove comment below.
    // <creating-property />

    const createdByObject = await this.userService.findById(
      createBlogDto.createdBy.id,
    );
    if (!createdByObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          createdBy: 'notExists',
        },
      });
    }
    const createdBy = createdByObject;

    return this.blogRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createBlogDto.description,

      createdBy,

      published: createBlogDto.published,

      publishedAt: createBlogDto.publishedAt,

      order: createBlogDto.order,

      tags: createBlogDto.tags,

      coverImage: createBlogDto.coverImage,

      content: createBlogDto.content,

      slug: createBlogDto.slug,

      title: createBlogDto.title,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.blogRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Blog['id']) {
    return this.blogRepository.findById(id);
  }

  findByIds(ids: Blog['id'][]) {
    return this.blogRepository.findByIds(ids);
  }

  async update(
    id: Blog['id'],

    updateBlogDto: UpdateBlogDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let createdBy: User | undefined = undefined;

    if (updateBlogDto.createdBy) {
      const createdByObject = await this.userService.findById(
        updateBlogDto.createdBy.id,
      );
      if (!createdByObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            createdBy: 'notExists',
          },
        });
      }
      createdBy = createdByObject;
    }

    return this.blogRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateBlogDto.description,

      createdBy,

      published: updateBlogDto.published,

      publishedAt: updateBlogDto.publishedAt,

      order: updateBlogDto.order,

      tags: updateBlogDto.tags,

      coverImage: updateBlogDto.coverImage,

      content: updateBlogDto.content,

      slug: updateBlogDto.slug,

      title: updateBlogDto.title,
    });
  }

  remove(id: Blog['id']) {
    return this.blogRepository.remove(id);
  }
}
