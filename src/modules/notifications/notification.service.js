/**
 * - Notifications module service: coordinate WhatsApp booking confirmations and
 *   appointment-change notices with background delivery, retries, and failure handling.
 * - Notification failures must not roll back or corrupt a booking; keep retries separate
 *   from appointment transactions.
 */