# Junebug account workflow

This module redirects successful public registrations to `/account-requested`.
The confirmation page explains that administrator approval is required and
that approved members create their own passwords through Drupal's one-time
login link.

The module alters only the public `user.register` route. Administrative user
creation, validation errors, and managed profile-picture uploads retain their
normal Drupal behavior.

## Development email

DDEV captures outgoing messages in Mailpit rather than delivering them to real
inboxes. Run `ddev mailpit` to inspect the administrator notification, pending
request email, activation email, and password links.

Production must be configured with a real outbound mail transport before the
site is launched.

