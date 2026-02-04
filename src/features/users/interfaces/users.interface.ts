import { FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUsersService {
  create(dto: CreateUserDto): Promise<void>;
  findAll(): Promise<User[]>;
  findOne(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    select?: (keyof User)[]
  ): Promise<User>;
  update(userId: string, updateUserDto: UpdateUserDto): Promise<void>;
  remove(userId: string, soft: boolean): Promise<void>;
}
