import { User } from 'features/users/entities/user.entity';
import { Session } from '../entities/session.entity';
import { IDevice } from './device.interface';
import { CustomAuth } from 'infrastructure/http/interfaces/custom-request.interface';
import { ISessionWithCurrent } from './session-with-current.interface';

export interface ISessionsService {
  getActive(userId: string, token: string): Promise<Session | null>;
  issue(
    userId: string,
    token: string,
    ip: string,
    device: IDevice
  ): Promise<Session>;
  list(customAuth: CustomAuth): Promise<ISessionWithCurrent[]>;
  revoke(user: User, token: string): Promise<void>;
  terminateOthers(user: User, token: string): Promise<void>;
}
