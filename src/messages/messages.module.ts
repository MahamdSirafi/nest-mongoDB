import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { DocumentMessagePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentMessagePersistenceModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService, DocumentMessagePersistenceModule],
})
export class MessagesModule {}
