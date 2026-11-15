# Junebug theme

This custom Drupal 11 theme provides the site shell, navigation, About page,
front page, Blog page, and Blog Post teaser cards.

## Refactor checkpoint: November 12, 2026

This checkpoint reorganized the original theme before additional features are
added. The work focused on predictable Drupal behavior, responsive layout,
accessible markup, smaller CSS scope, and safer asset handling.

### Drupal and Twig

- The base page template now provides a real `main` landmark and a stable
  full-width content wrapper.
- The secondary menu, breadcrumb, and sidebar regions are intentionally not
  rendered. They previously produced an unwanted search/login column,
  breadcrumb link, and empty page space.
- The main menu override uses Drupal's recursive menu structure. It preserves
  child items, item attributes, expanded/collapsed state, and active-trail
  state.
- The Junebug brand is a link to Drupal's configured front route instead of an
  `h1` on every page.
- Signup and Login are no longer injected by Twig. Add account links through
  Drupal's menu administration when they are wanted in navigation.
- The About page uses one page heading, paragraphs for biography text, proper
  subsection headings, and a responsive two-column layout.
- The About heading, portrait, biography, likes, and favorites are editable on
  the About node rather than being hard-coded in Twig. These optional fields
  are attached to the standard Page type and are rendered only by `/about`.
- The Blog page owns its visible page heading while the base template owns the
  surrounding page structure.
- Blog Post teaser preprocessing now targets the configured `blog_post`
  bundle. Teasers preserve Drupal attributes and contextual links and render
  the formatted body when an excerpt is unavailable.
- Alias-based page template suggestions are handled by one documented alter
  hook. For example, `/about` resolves to `page--about.html.twig`.

### CSS organization

The global theme library now loads five stylesheets:

- `css/base/elements.css`: design tokens, box sizing, typography, and
  responsive image defaults.
- `css/layout/layout.css`: site shell, content width, and reusable row layout.
- `css/component/menu.css`: navigation, active state, keyboard focus, nested
  menus, and navigation breakpoints.
- `css/component/node.css`: Blog Post teaser cards and their responsive layout.
- `css/global.css`: shared visual treatments plus About and Blog page styles.

The refactor removed empty library entries and unused CSS for dormant alerts,
modals, toasts, loading/error states, comments, form overrides, old like
controls, and unused spacing/flex utilities. Generic `.container`, `.row`, and
element-wide form/heading rules were replaced or removed to avoid affecting
Drupal-generated markup.

### JavaScript

- The theme library explicitly depends on `core/drupal` and `core/once`.
- The console-only placeholder behavior was removed.
- Color rotation is initialized once per heading and its timer is cleared when
  Drupal detaches the element.
- The behavior responds to live `prefers-reduced-motion` changes.
- Rotating colors use at least 6:1 contrast against the green front-page card,
  and the interval was slowed from 500 ms to 1.2 seconds.

### Assets and repository hygiene

- EXIF, device, software, and capture-time metadata were stripped from
  `images/me.jpeg`. The image remains 200 by 352 pixels.
- The tracked Windows `Zone.Identifier` file was removed.
- `*:Zone.Identifier` is ignored to prevent future Windows metadata streams
  from being committed.
- Git attributes treat JPEG files as binary, preventing whitespace checks and
  text diffs from interpreting image bytes as source code.

### Editing the About page

Edit node 2 (`/node/2/edit`) to update the content shown at `/about`:

- **About heading** controls the large heading in the yellow biography card.
- **About portrait** supports an editable image and required alternative text.
- **About biography** supports formatted paragraph content.
- **Things I like** and **Favorite things** are multi-value text fields; use
  one list item per row.

The fields are optional because they belong to the shared Page content type and
should not prevent other Page nodes from being saved. The current portrait was
copied into Drupal's public file storage at `public://about/nora.jpeg`.

Configuration for the field definitions and Page form/view displays is tracked
in `config/sync`. Node field values and the managed portrait file are content,
so deployments must also transfer the database and public files or recreate
that content in the destination environment.

### Validation performed

- PHP syntax validation passed for `junebug_theme.theme`.
- JavaScript syntax validation passed for `color-rotate.js`.
- Drupal cache rebuilds completed successfully after Twig, library, CSS, and
  JavaScript changes.
- Home and About returned successful responses without Drupal errors.
- Drupal's aggregated CSS and JavaScript contained the reorganized theme assets
  and declared dependencies.
- CSS brace checks and `git diff --check` passed.

### Decisions still open

- The Blog View allows authenticated users only, so anonymous requests to
  `/blog` return 403. Decide whether the blog should be public.
- Parkinsans is loaded from Google Fonts. Self-host it if third-party font
  requests are undesirable.
- Add Signup/Login as Drupal menu links if anonymous account links should
  return to the main navigation.

## Pre-push checks

From the project root:

```bash
ddev exec drush cr
ddev exec php -l web/themes/junebug_theme/junebug_theme.theme
ddev exec node --check web/themes/junebug_theme/js/color-rotate.js
git diff --check
git status --short
```
