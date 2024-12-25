import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Bashar } from '../../domain/bashar';

export abstract class BasharRepository {
  abstract create(
    data: Omit<Bashar, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Bashar>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Bashar[]>;

  abstract findById(id: Bashar['id']): Promise<NullableType<Bashar>>;

  abstract findByIds(ids: Bashar['id'][]): Promise<Bashar[]>;

  abstract update(
    id: Bashar['id'],
    payload: DeepPartial<Bashar>,
  ): Promise<Bashar | null>;

  abstract remove(id: Bashar['id']): Promise<void>;
}
