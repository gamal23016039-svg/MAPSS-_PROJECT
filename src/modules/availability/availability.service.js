/**
 * - Availability module service: calculate bookable slots and remaining capacity from shifts
 *   and appointments.
 * - Use the shared eligible appointment statuses: count capacity-consuming bookings and
 *   consistently exclude cancelled and other explicitly non-capacity-consuming states.
 * - Respect shift availability, the 30-day booking horizon, and the one-hour pre-start
 *   cutoff.
 */