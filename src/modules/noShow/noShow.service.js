/**
 * - No-show module service: find eligible missed appointments, record a reason and no-show
 *   count safely, and avoid duplicate processing.
 * - Coordinate with appointment state and scheduled job execution; never automatically ban
 *   patients.
 */