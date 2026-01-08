import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PortfolioEntity } from '../entities/portfolio.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Portfolio } from '../../../../domain/portfolio';
import { PortfolioRepository } from '../../portfolio.repository';
import { PortfolioMapper } from '../mappers/portfolio.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PortfolioRelationalRepository implements PortfolioRepository {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
  ) {}

  async create(data: Portfolio): Promise<Portfolio> {
    const persistenceModel = PortfolioMapper.toPersistence(data);
    const newEntity = await this.portfolioRepository.save(
      this.portfolioRepository.create(persistenceModel),
    );
    return PortfolioMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Portfolio[]> {
    const entities = await this.portfolioRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PortfolioMapper.toDomain(entity));
  }

  async findById(id: Portfolio['id']): Promise<NullableType<Portfolio>> {
    const entity = await this.portfolioRepository.findOne({
      where: { id },
    });

    return entity ? PortfolioMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Portfolio['id'][]): Promise<Portfolio[]> {
    const entities = await this.portfolioRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PortfolioMapper.toDomain(entity));
  }

  async update(
    id: Portfolio['id'],
    payload: Partial<Portfolio>,
  ): Promise<Portfolio> {
    const entity = await this.portfolioRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.portfolioRepository.save(
      this.portfolioRepository.create(
        PortfolioMapper.toPersistence({
          ...PortfolioMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PortfolioMapper.toDomain(updatedEntity);
  }

  async remove(id: Portfolio['id']): Promise<void> {
    await this.portfolioRepository.delete(id);
  }
}
