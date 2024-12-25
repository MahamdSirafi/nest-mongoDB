import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './infrastructure/persistence/message.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Message } from './domain/message';

@Injectable()
export class MessagesService {
  constructor(
    // Dependencies here
    private readonly messageRepository: MessageRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createMessageDto: CreateMessageDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.messageRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.messageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Message['id']) {
    return this.messageRepository.findById(id);
  }

  findByIds(ids: Message['id'][]) {
    return this.messageRepository.findByIds(ids);
  }

  async update(
    id: Message['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateMessageDto: UpdateMessageDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.messageRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Message['id']) {
    return this.messageRepository.remove(id);
  }
}
