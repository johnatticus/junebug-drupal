# Junebug access control

This module keeps the `blog_post` content type private to active, authenticated
users. It complements the role restriction on the `/blog` View by protecting
individual Blog Post URLs and access-checked queries such as Views and search.

## Account and role model

- Anonymous visitors may view the site's public content but cannot view Blog
  Posts.
- Visitors may request accounts and must verify their email addresses. New
  accounts remain blocked until an administrator approves them.
- Every approved account receives Drupal's built-in `Authenticated user` role
  and may view Blog Posts.
- The custom `Contributor` role may create Blog Posts and edit or delete only
  Blog Posts owned by that user. It does not grant access to administration
  pages or permission to edit another author's content.
- Administrators retain full site access.

Assign `Contributor` only to members who should publish. From **People**
(`/admin/people`), select the account and use **Add the Contributor role to the
selected user(s)**. The matching remove action revokes publishing ability
without removing the member's blog access.

## Implementation

`hook_node_access()` explicitly denies anonymous Blog Post views.
`hook_node_access_records()` and `hook_node_grants()` add a `junebug_blog`
node-access realm so query results obey the same restriction. Normal Drupal
content permissions remain responsible for create, update, and delete access.

Rebuild node access after changing grant logic:

```bash
ddev exec drush php:eval 'node_access_rebuild(TRUE);'
ddev exec drush cr
```

The role, bulk role-assignment actions, enabled module, and registration policy
are stored in `config/sync`.

