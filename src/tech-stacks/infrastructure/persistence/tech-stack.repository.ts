import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { TechStack } from '../../domain/tech-stack';

export abstract class TechStackRepository {
  abstract create(
    data: Omit<TechStack, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TechStack>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<TechStack[]>;

  abstract findById(id: TechStack['id']): Promise<NullableType<TechStack>>;

  abstract findByIds(ids: TechStack['id'][]): Promise<TechStack[]>;

  abstract update(
    id: TechStack['id'],
    payload: DeepPartial<TechStack>,
  ): Promise<TechStack | null>;

  abstract remove(id: TechStack['id']): Promise<void>;
}
