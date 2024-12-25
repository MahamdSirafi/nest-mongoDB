import { Module } from '@nestjs/common';
import { BasharsService } from './bashars.service';
import { BasharsController } from './bashars.controller';
import { DocumentBasharPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentBasharPersistenceModule,
  ],
  controllers: [BasharsController],
  providers: [BasharsService],
  exports: [BasharsService, DocumentBasharPersistenceModule],
})
export class BasharsModule {}
