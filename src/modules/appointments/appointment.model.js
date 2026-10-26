/**
 * - Appointment module model: define appointment fields, patient/shift references, booking
 *   source, queue number, status, cancellation metadata, timestamps, constraints, and
 *   indexes.
 * - Include a suitable compound constraint against duplicate active patient/shift bookings;
 *   keep state rules in the service.
 */