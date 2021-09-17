import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage, KAFKA_TOPICS } from 'src/config/kafka.config';
import { ContactsService } from './contacts.service';
import { UserCreatedDto } from './dto/user-created.dto';
import { UserDeletedDto } from './dto/user-deleted.dto';
import { UserUpdatedDto } from './dto/user-updated.sto';

@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @MessagePattern(KAFKA_TOPICS.USER_CREATED)
  async create(@Payload() message: KafkaMessage<UserCreatedDto>) {
    const { name, email, id } = message.value;
    await this.contactsService.create({
      monilith_user_id: id,
      name,
      email,
    });
  }

  @MessagePattern(KAFKA_TOPICS.USER_UPDATED)
  async update(@Payload() message: KafkaMessage<UserUpdatedDto>) {
    const { id: monolithUserId, ...data } = message.value;
    await this.contactsService.update(+monolithUserId, data);
  }

  @MessagePattern(KAFKA_TOPICS.USER_DELETED)
  async remove(@Payload() message: KafkaMessage<UserDeletedDto>) {
    const { id: monolithUserId } = message.value;
    return this.contactsService.remove(+monolithUserId);
  }
}
