/**
 * - Authorization middleware responsibilities:
 * - Check the authenticated user's roles and permissions against route requirements.
 * - Allow authorized requests and reject requests without the required access.
 * - Run after JWT authentication middleware.
 * - Enforce the required roles on administrative routes.
 */