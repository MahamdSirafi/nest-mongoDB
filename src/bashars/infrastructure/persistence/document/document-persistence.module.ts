import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasharSchema, BasharSchemaClass } from './entities/bashar.schema';
import { BasharRepository } from '../bashar.repository';
import { BasharDocumentRepository } from './repositories/bashar.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BasharSchemaClass.name, schema: BasharSchema },
    ]),
  ],
  providers: [
    {
      provide: BasharRepository,
      useClass: BasharDocumentRepository,
    },
  ],
  exports: [BasharRepository],
})
export class DocumentBasharPersistenceModule {}
