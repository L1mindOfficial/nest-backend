import { HashingService } from 'auth/hashing/hashing.service';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { User } from 'users/entities/user.entity';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(private readonly hashingService: HashingService) {}

  listenTo() {
    return User;
  }

  async beforeInsert({ entity }: InsertEvent<User>) {
    entity.password = await this.hashingService.hash(entity.password);
  }

  async beforeUpdate({ entity }: UpdateEvent<User>) {
    entity.password = await this.hashingService.hash(entity.password);
  }
}
