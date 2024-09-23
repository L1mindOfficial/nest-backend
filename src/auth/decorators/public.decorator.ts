import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Custom decorator to mark a route as public.
 *
 * When applied to a route handler, this decorator sets a metadata
 * key (`isPublic`) to `true`, indicating that the route should be
 * accessible without authentication.
 *
 * This is useful for public endpoints, such as login and registration,
 * where no authentication is required.
 *
 * Usage: `@Public()` can be used above route handler methods.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
