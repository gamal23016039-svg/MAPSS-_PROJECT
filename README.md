# Hospital Appointment Booking Backend

## Purpose

This backend scaffold is intended for a hospital appointment booking system
built with Node.js, Express.js, MongoDB, and JavaScript using CommonJS
(`require` and `module.exports`). The files currently document planned
responsibilities; they do not mean that application behavior has been
implemented.

## Setup and configuration

Install a supported Node.js release and make a MongoDB instance available.
Create a local `.env` file from `.env.example` and replace its safe placeholders
with environment-specific values. Keep `.env` and all real credentials out of
source control. The application is intended to validate its environment
configuration at startup; secrets must never be hardcoded.

## Scripts

No package manifest or npm scripts are currently defined in this backend
scaffold. When they are added, document and run the scripts declared in
`package.json`; do not assume script names before they exist.

## Architecture

- `src/app.js` will compose Express middleware, API routes, error handling, and
  Swagger/OpenAPI documentation; `src/server.js` will manage connections and
  HTTP server startup/shutdown.
- `src/config/` contains shared database, environment, and API documentation
  configuration. `src/middlewares/` contains authentication, authorization,
  validation-result, and error handling. `src/utils/` contains reusable error,
  response, and asynchronous-handler utilities.
- `src/modules/` groups domain models, services, controllers, routes, and
  request validation. Models own MongoDB schema and index concerns; services
  own business rules and database coordination; controllers translate HTTP
  input/output; routes compose middleware; validation files check request data.
- `src/jobs/noShow.job.js` will coordinate scheduled no-show detection.
  Notifications and delivery retries are separate from appointment booking so
  delivery failures cannot corrupt booking data.
- `tests/unit/` is intended for isolated service, validation, and business-rule
  tests. `tests/integration/` is intended for API, database, authentication,
  and authorization tests.

## Core domain expectations

Authentication will use bcrypt-hashed passwords and JWTs for protected
endpoints. Patient registration must reject duplicate phone and identity
numbers with HTTP 409. Administrative endpoints must enforce the required
roles, and only authorized staff may act for another patient.

Appointments must respect the 30-day booking horizon, the one-hour pre-shift
cutoff, shift availability, and capacity-consuming statuses. Duplicate active
bookings and concurrent capacity changes need database-level constraints and
atomic operations or appropriate transactions. Cancellation must follow the
configured cancellation window and release capacity consistently. Queue
numbers must be assigned safely, and booking source must be recorded.

Reception permissions govern check-in; cash payments follow successful
check-in. Examination completion must follow valid appointment state
transitions. No-show processing records the reason/count and must not
automatically ban patients.

## API documentation and testing

Swagger/OpenAPI configuration is planned in `src/config/swagger.js` and will
be exposed through Express when the app wiring is implemented. Unit and
integration tests belong in their respective `tests/` directories. Run test,
lint, and build commands only after the corresponding package scripts and
tooling have been defined.