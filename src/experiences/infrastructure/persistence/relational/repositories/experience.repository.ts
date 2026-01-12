import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ExperienceEntity } from '../entities/experience.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Experience } from '../../../../domain/experience';
import { ExperienceRepository } from '../../experience.repository';
import { ExperienceMapper } from '../mappers/experience.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExperienceRelationalRepository implements ExperienceRepository {
  constructor(
    @InjectRepository(ExperienceEntity)
    private readonly experienceRepository: Repository<ExperienceEntity>,
  ) {}

  async create(data: Experience): Promise<Experience> {
    const persistenceModel = ExperienceMapper.toPersistence(data);
    const newEntity = await this.experienceRepository.save(
      this.experienceRepository.create(persistenceModel),
    );
    return ExperienceMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Experience[]> {
    const entities = await this.experienceRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ExperienceMapper.toDomain(entity));
  }

  async findById(id: Experience['id']): Promise<NullableType<Experience>> {
    const entity = await this.experienceRepository.findOne({
      where: { id },
    });

    return entity ? ExperienceMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Experience['id'][]): Promise<Experience[]> {
    const entities = await this.experienceRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ExperienceMapper.toDomain(entity));
  }

  async update(
    id: Experience['id'],
    payload: Partial<Experience>,
  ): Promise<Experience> {
    const entity = await this.experienceRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.experienceRepository.save(
      this.experienceRepository.create(
        ExperienceMapper.toPersistence({
          ...ExperienceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ExperienceMapper.toDomain(updatedEntity);
  }

  async remove(id: Experience['id']): Promise<void> {
    await this.experienceRepository.delete(id);
  }
}
