import { Message } from '../../../../domain/message';
import { MessageSchemaClass } from '../entities/message.schema';

export class MessageMapper {
  public static toDomain(raw: MessageSchemaClass): Message {
    const domainEntity = new Message();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Message): MessageSchemaClass {
    const persistenceSchema = new MessageSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
