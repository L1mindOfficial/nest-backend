import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {
  register(dto: CreateUserDto): Promise<void>;
  list(): Promise<User[]>;
  findByIdentifierForAuth(identifier: string): Promise<User | null>;
  updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<void>;
  setPassword(userid: string, hashPassword: string): Promise<void>;
  hardDelete(userId: string): Promise<void>;
  softDelete(userId: string): Promise<void>;
}
