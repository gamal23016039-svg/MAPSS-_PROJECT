/**
 * - Auth module service: coordinate patient registration, login, JWT issuance and
 *   verification support, OTP password recovery, and password updates.
 * - Reject duplicate registered phone or identity numbers with HTTP 409, hash passwords with
 *   bcrypt, and never persist or return plaintext passwords.
 */