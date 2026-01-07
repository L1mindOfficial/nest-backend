import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { UserDeletionConflictError } from './errors/user-deletion-conflict-error';
import { UserNotFoundError } from './errors/user-not-found.error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // ---------------- CREATE ----------------
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return plainToInstance(User, await this.userRepository.save(user));
    } catch (error: any) {
      this.handleUniqueConstraintError(error, createUserDto);
    }
  }

  // ---------------- FIND ALL ----------------
  async findAll() {
    return this.userRepository.find();
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
    const user = await this.userRepository.findOne({ where, select });
    if (!user) {
      const firstCondition = Array.isArray(where) ? where[0] : where;
      const field = Object.keys(firstCondition)[0] as 'email' | 'username';
      const value = Object.values(firstCondition)[0];
      throw new UserNotFoundError(field, value?.toString() || '');
    }
    return user;
  }

  // ---------------- FIND BY ID ----------------
  async findOneById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UserNotFoundError('id', id);
    return user;
  }

  // ---------------- UPDATE ----------------
  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOneById(id);
    try {
      await this.userRepository.update({ id }, updateUserDto);
      return { ...existingUser, ...updateUserDto };
    } catch (error: any) {
      this.handleUniqueConstraintError(error, updateUserDto);
    }
  }

  // ---------------- REMOVE ----------------
  async remove(id: string, soft: boolean) {
    const user = await this.findOneById(id);
    try {
      if (soft) await this.userRepository.softRemove(user);
      else await this.userRepository.remove(user);

      return {
        message: `User with ID ${id} deleted successfully`,
        softDeleted: soft
      };
    } catch (error: any) {
      if (error.code === '23503') throw new UserDeletionConflictError(id);
      throw error;
    }
  }

  // ---------------- PRIVATE HELPERS ----------------
  private handleUniqueConstraintError(
    error: any,
    dto: Partial<{ email: string; username: string }>
  ) {
    if (error.code === '23505') {
      const detail: string = error.detail ?? '';

      if (detail.includes('email')) {
        throw new UserAlreadyExistsError('email', dto.email!);
      }
      if (detail.includes('username')) {
        throw new UserAlreadyExistsError('username', dto.username!);
      }
    }
    throw error;
  }
}
