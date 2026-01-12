import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Portfolio } from '../../domain/portfolio';

export abstract class PortfolioRepository {
  abstract create(
    data: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Portfolio>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Portfolio[]>;

  abstract findById(id: Portfolio['id']): Promise<NullableType<Portfolio>>;

  abstract findByIds(ids: Portfolio['id'][]): Promise<Portfolio[]>;

  abstract update(
    id: Portfolio['id'],
    payload: DeepPartial<Portfolio>,
  ): Promise<Portfolio | null>;

  abstract remove(id: Portfolio['id']): Promise<void>;
}
