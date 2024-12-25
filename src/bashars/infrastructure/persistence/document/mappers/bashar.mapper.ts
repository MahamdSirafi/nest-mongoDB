import { Bashar } from '../../../../domain/bashar';
import { BasharSchemaClass } from '../entities/bashar.schema';

export class BasharMapper {
  public static toDomain(raw: BasharSchemaClass): Bashar {
    const domainEntity = new Bashar();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Bashar): BasharSchemaClass {
    const persistenceSchema = new BasharSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
