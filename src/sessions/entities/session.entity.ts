import { Device } from 'common/interfaces/device.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  token: string;

  @Column({ type: 'json' })
  device: Device;

  @Column()
  ip: string;

  @Column()
  expiryDate: Date;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false
  })
  owner: User;
}
