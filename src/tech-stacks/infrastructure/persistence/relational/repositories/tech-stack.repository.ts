import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TechStackEntity } from '../entities/tech-stack.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { TechStack } from '../../../../domain/tech-stack';
import { TechStackRepository } from '../../tech-stack.repository';
import { TechStackMapper } from '../mappers/tech-stack.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class TechStackRelationalRepository implements TechStackRepository {
  constructor(
    @InjectRepository(TechStackEntity)
    private readonly techStackRepository: Repository<TechStackEntity>,
  ) {}

  async create(data: TechStack): Promise<TechStack> {
    const persistenceModel = TechStackMapper.toPersistence(data);
    const newEntity = await this.techStackRepository.save(
      this.techStackRepository.create(persistenceModel),
    );
    return TechStackMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<TechStack[]> {
    const entities = await this.techStackRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => TechStackMapper.toDomain(entity));
  }

  async findById(id: TechStack['id']): Promise<NullableType<TechStack>> {
    const entity = await this.techStackRepository.findOne({
      where: { id },
    });

    return entity ? TechStackMapper.toDomain(entity) : null;
  }

  async findByIds(ids: TechStack['id'][]): Promise<TechStack[]> {
    const entities = await this.techStackRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => TechStackMapper.toDomain(entity));
  }

  async update(
    id: TechStack['id'],
    payload: Partial<TechStack>,
  ): Promise<TechStack> {
    const entity = await this.techStackRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.techStackRepository.save(
      this.techStackRepository.create(
        TechStackMapper.toPersistence({
          ...TechStackMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TechStackMapper.toDomain(updatedEntity);
  }

  async remove(id: TechStack['id']): Promise<void> {
    await this.techStackRepository.delete(id);
  }
}
