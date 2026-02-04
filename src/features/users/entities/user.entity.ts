import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Session } from 'features/sessions/entities/session.entity';
import { RegistryDatesOrm } from 'infrastructure/database/embedded/registry-dates.embedded';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { SwaggerUserProperties as UserProps } from '../users.swagger';

@Entity()
@Unique('users_email_unique', ['email'])
@Unique('users_username_unique', ['username'])
export class User {
  @ApiProperty(UserProps.id)
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ApiPropertyOptional(UserProps.name)
  @Column({ length: 50, nullable: true, select: false })
  name: string;

  @ApiProperty(UserProps.email)
  @Column({ unique: true })
  email: string;

  @ApiProperty(UserProps.username)
  @Column({ unique: true, length: 30 })
  username: string;

  @ApiProperty(UserProps.password)
  @Column({ select: false })
  @Exclude()
  password: string;

  @ApiPropertyOptional(UserProps.status)
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.DEACTIVATE })
  @Exclude()
  status: UserStatus;

  @ApiPropertyOptional(UserProps.role)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Exclude()
  role: UserRole;

  @ApiProperty(UserProps.registryDates)
  @Column(() => RegistryDatesOrm, { prefix: false })
  @Exclude()
  registryDates: RegistryDatesOrm;

  @ApiProperty(UserProps.sessions)
  @OneToMany(() => Session, (session) => session.owner, {
    cascade: ['soft-remove', 'recover']
  })
  sessions: Session[];

  @ApiProperty(UserProps.isDeleted)
  get isDeleted() {
    return !!this.registryDates.deleteAt;
  }
}
