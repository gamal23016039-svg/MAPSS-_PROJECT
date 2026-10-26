/**
 * - Notifications module model: define delivery-job state, appointment/user references,
 *   retry metadata, and failure details where persistence is needed.
 * - Keep delivery attempts separate from booking transactions and avoid storing unnecessary
 *   sensitive message content.
 */