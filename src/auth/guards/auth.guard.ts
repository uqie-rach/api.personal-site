import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

/**
 * Custom authentication guard that extends Passport's JWT authentication strategy.
 * 
 * This guard provides two-layer access control:
 * 1. For routes marked as 'public' - allows unrestricted access (bypasses JWT validation)
 * 2. For all other routes - enforces JWT authentication via parent class
 * 
 * The guard uses NestJS Reflector to check for a custom 'isPublic' metadata decorator
 * on route handlers. This enables fine-grained control over which endpoints require
 * authentication and which are publicly accessible.
 * 
 * Usage:
 * - Apply @Public() decorator to routes that should be accessible without authentication
 * - All other routes automatically require valid JWT token for access
 */
@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    /**
     * Determines if the current request is allowed to proceed.
     * 
     * Logic flow:
     * 1. Check if the target route/handler has the 'isPublic' metadata set to true
     * 2. If public, immediately return true (allow access without authentication)
     * 3. If not public, delegate to parent class for JWT token validation
     * 
     * @param context - The execution context containing request details and metadata
     * @returns boolean indicating whether the request should be allowed
     */
    canActivate(context: ExecutionContext) {
        // Retrieve the 'isPublic' metadata from the route handler using Reflector
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler()
        );

        // If route is marked as public, bypass authentication and allow access
        if (isPublic) {
            return true;
        }

        // For protected routes, fall back to parent JWT authentication guard
        // This validates the JWT token from Authorization header
        return super.canActivate(context);
    }
}
