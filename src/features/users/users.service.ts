import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUsersService } from './interfaces/users.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly dataSource: DataSource) {}

  // ---------------- CREATE ----------------
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.dataSource.getRepository(User).create(createUserDto);
      await this.dataSource.getRepository(User).save(user);
    } catch (error: any) {
      this.handleUniqueConstraintError(error);
    }
  }

  // ---------------- FIND ALL ----------------
  async findAll() {
    return this.dataSource.getRepository(User).find();
  }

  // ---------------- FIND ONE ----------------
  async findOne(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    select: (keyof User)[] = [
      'id',
      'email',
      'name',
      'username',
      'password',
      'role',
      'status'
    ]
  ) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where, select });
    if (!user) throw new NotFoundException();
    return user;
  }

  // ---------------- FIND BY ID ----------------
  async findOneById(id: string) {
    const user = await this.dataSource.getRepository(User).findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  // ---------------- UPDATE ----------------
  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOneById(id);
    try {
      if (existingUser)
        await this.dataSource.getRepository(User).update({ id }, updateUserDto);
    } catch (error: any) {
      this.handleUniqueConstraintError(error);
    }
  }

  // ---------------- REMOVE ----------------
  async remove(id: string, soft: boolean) {
    const user = await this.findOneById(id);
    try {
      if (soft) await this.dataSource.getRepository(User).softRemove(user);
      else await this.dataSource.getRepository(User).remove(user);
    } catch (error: any) {
      if (error.code === '23503') throw new ConflictException();
      throw error;
    }
  }

  // ---------------- PRIVATE HELPERS ----------------
  private handleUniqueConstraintError(error: any) {
    if (error.code === '23505') {
      const detail: string = error.detail ?? '';

      if (detail.includes('email'))
        throw new UnprocessableEntityException('email already exists');

      if (detail.includes('username'))
        throw new UnprocessableEntityException('username already exists');
    }

    throw error;
  }
}
