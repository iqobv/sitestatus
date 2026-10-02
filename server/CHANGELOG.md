# Server changelog

## [1.3.1] - 2026-10-02

### Added

- Added exponential backoff for failing monitors, scaling from 30-second initial checks to automatic deactivation after 24 hours of downtime.

## [1.3.0] - 2026-10-02

### Added

- Added Sentry integration for error tracking.
- Added environment variables validation.

### Changed

- Migrated from TursoDB to PostgreSQL for logs.
- Migrated API docs from Swagger to Scalar.

## [1.2.0] - 2026-06-25

### Added

- Added pagination to monitors, projects, status pages and notifications endpoints.
- Added dashboard endpoint.

## [1.1.1] - 2026-05-12

### Fixed

- Session creation bug.

## [1.1.0] - 2026-05-12

### Added

- Added email alerting system.
- Added Google One Tap authentication and GitHub authentication.
- Added status pages.
- Added notifications system.
- Added soft delete system for monitors, projects and users.
- Added sessions management system.

### Removed

- Removed public page settings from project settings.

## [1.0.0] - 2026-04-23

### Added

- Added Azure Service Bus for queueing ping tasks.
- Added TursoDB for logs.
- Added projects system.

### Changed

- Replaced session-based auth with JWT.
