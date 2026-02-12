import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

export class UserProfileDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user'
  })
  name?: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username'
  })
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address'
  })
  email: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'User role'
  })
  role: UserRole;

  @ApiProperty({
    example: '2024-10-01T12:34:56.000Z',
    description: 'Account creation date'
  })
  registeredAt: Date;

  constructor(
    name: string,
    username: string,
    email: string,
    role: UserRole,
    registeredAt: Date
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.role = role;
    this.registeredAt = registeredAt;
  }
}
