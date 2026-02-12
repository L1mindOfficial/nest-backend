import { ApiProperty } from '@nestjs/swagger';
import { User } from '@features/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IDevice } from '../interfaces/device.interface';
import { SwaggerSessionProperties as SessionProps } from '../sessions.swagger';

@Entity()
export class Session {
  @ApiProperty(SessionProps.id)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty(SessionProps.token)
  @Column({ unique: true })
  token: string;

  @ApiProperty(SessionProps.device)
  @Column({ type: 'json' })
  device: IDevice;

  @ApiProperty(SessionProps.ip)
  @Column()
  ip: string;

  @ApiProperty(SessionProps.expiryDate)
  @Column()
  expiryDate: Date;

  @ApiProperty(SessionProps.user)
  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  owner: User;
}
