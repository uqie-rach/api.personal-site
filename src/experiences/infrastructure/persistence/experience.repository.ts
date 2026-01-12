import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Experience } from '../../domain/experience';

export abstract class ExperienceRepository {
  abstract create(
    data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Experience>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Experience[]>;

  abstract findById(id: Experience['id']): Promise<NullableType<Experience>>;

  abstract findByIds(ids: Experience['id'][]): Promise<Experience[]>;

  abstract update(
    id: Experience['id'],
    payload: DeepPartial<Experience>,
  ): Promise<Experience | null>;

  abstract remove(id: Experience['id']): Promise<void>;
}
