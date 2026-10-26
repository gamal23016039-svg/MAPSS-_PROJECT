/**
 * - Scheduled entry point for safely detecting appointments whose patients did not attend.
 * - Delegate detection and recording to the noShow service, avoid duplicate processing, and
 *   never automatically ban patients.
 */