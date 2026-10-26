/**
 * - Patients module service: manage patient profiles, identity/contact information, and
 *   authorized patient search.
 * - Coordinate with users/auth; protect sensitive data and treat duplicate phone or identity
 *   numbers as HTTP 409 conflicts during registration.
 */