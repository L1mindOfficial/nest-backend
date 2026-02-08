import { IDevice } from '../interfaces/device.interface';

export class SessionsDto {
  readonly ip: string;
  readonly expiryDate: Date;
  readonly device: IDevice;
  readonly current?: boolean;
}
