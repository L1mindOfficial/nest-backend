import { HashingProvider } from 'features/auth/providers/hashing.provider';
import { User } from 'features/users/entities/user.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingProvider: HashingProvider
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert({ entity }: InsertEvent<User>) {
    entity.password = await this.hashingProvider.hash(entity.password);
  }

  async beforeUpdate({ entity }: UpdateEvent<User>) {
    if (!entity) return;

    if (typeof entity.password === 'string' && entity.password.length > 0) {
      entity.password = await this.hashingProvider.hash(entity.password);
    }
  }
}
