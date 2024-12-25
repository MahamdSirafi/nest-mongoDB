import { Injectable } from '@nestjs/common';
import { CreateBasharDto } from './dto/create-bashar.dto';
import { UpdateBasharDto } from './dto/update-bashar.dto';
import { BasharRepository } from './infrastructure/persistence/bashar.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Bashar } from './domain/bashar';

@Injectable()
export class BasharsService {
  constructor(
    // Dependencies here
    private readonly basharRepository: BasharRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createBasharDto: CreateBasharDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.basharRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.basharRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Bashar['id']) {
    return this.basharRepository.findById(id);
  }

  findByIds(ids: Bashar['id'][]) {
    return this.basharRepository.findByIds(ids);
  }

  async update(
    id: Bashar['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBasharDto: UpdateBasharDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.basharRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Bashar['id']) {
    return this.basharRepository.remove(id);
  }
}
