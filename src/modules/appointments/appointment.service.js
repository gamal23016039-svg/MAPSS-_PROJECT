/**
 * - Appointment module service: create, view, modify, and cancel bookings, including
 *   bookings by authorized staff; coordinate patients, shifts, availability, and
 *   notifications.
 * - Enforce the 30-day horizon, one-hour pre-shift cutoff, past/unavailable-shift
 *   restrictions, capacity-consumption statuses, atomic capacity protection, safe queue
 *   assignment, and booking source tracking.
 * - Apply the configured cancellation window (including any two-hour restriction) and
 *   release capacity consistently.
 * - Notify separately so delivery failures/retries cannot corrupt booking transactions.
 */