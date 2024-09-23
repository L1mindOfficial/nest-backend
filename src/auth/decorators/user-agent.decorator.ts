import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Device } from 'common/interfaces/device.interface';

/**
 * Custom decorator to extract the user's device information from the request.
 *
 * This decorator analyzes the 'user-agent' header of the incoming request
 * to determine the device type and version. It supports various operating
 * systems, including iOS, Android, macOS, Windows, and Linux.
 *
 * If the user-agent string doesn't match any known patterns, the device
 * is set to 'unknown'. This information can be valuable for analytics,
 * user experience improvements, and security checks.
 *
 * Usage: `@UserAgent()` can be used in route handlers to get the device
 * information of the client.
 */
export const UserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Device => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'];

    let device: Device = {
      name: 'unknown'
    };

    if (userAgent) {
      if (/like Mac OS X/.test(userAgent)) {
        device = {
          name: 'iOS',
          version: /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/
            .exec(userAgent)?.[2]
            .replace(/_/g, '.')
        };
      } else if (/Android/.test(userAgent)) {
        device = {
          name: 'Android',
          version: /Android ([0-9\.]+)[\);]/.exec(userAgent)?.[1]
        };
      } else if (/(Intel|PPC) Mac OS X/.test(userAgent)) {
        device = {
          name: 'macOS',
          version: /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/
            .exec(userAgent)?.[2]
            .replace(/_/g, '.')
        };
      } else if (/Windows NT/.test(userAgent)) {
        device = {
          name: 'Windows',
          version: /Windows NT ([0-9\._]+)[\);]/.exec(userAgent)?.[1]
        };
      } else if (/Linux/i.test(userAgent) && /X11/i.test(userAgent)) {
        device = {
          name: 'Linux'
        };
      }
    }

    return device;
  }
);
