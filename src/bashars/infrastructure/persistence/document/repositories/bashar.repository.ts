import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BasharSchemaClass } from '../entities/bashar.schema';
import { BasharRepository } from '../../bashar.repository';
import { Bashar } from '../../../../domain/bashar';
import { BasharMapper } from '../mappers/bashar.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class BasharDocumentRepository implements BasharRepository {
  constructor(
    @InjectModel(BasharSchemaClass.name)
    private readonly basharModel: Model<BasharSchemaClass>,
  ) {}

  async create(data: Bashar): Promise<Bashar> {
    const persistenceModel = BasharMapper.toPersistence(data);
    const createdEntity = new this.basharModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return BasharMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Bashar[]> {
    const entityObjects = await this.basharModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      BasharMapper.toDomain(entityObject),
    );
  }

  async findById(id: Bashar['id']): Promise<NullableType<Bashar>> {
    const entityObject = await this.basharModel.findById(id);
    return entityObject ? BasharMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Bashar['id'][]): Promise<Bashar[]> {
    const entityObjects = await this.basharModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      BasharMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Bashar['id'],
    payload: Partial<Bashar>,
  ): Promise<NullableType<Bashar>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.basharModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.basharModel.findOneAndUpdate(
      filter,
      BasharMapper.toPersistence({
        ...BasharMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? BasharMapper.toDomain(entityObject) : null;
  }

  async remove(id: Bashar['id']): Promise<void> {
    await this.basharModel.deleteOne({ _id: id });
  }
}
