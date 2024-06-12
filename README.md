# eleventy-bookmarklet

11ty starter for a bookmarklet.

## Quick Start

1. `git clone https://github.com/psalaets/eleventy-bookmarklet.git <dir>`
2. `cd <dir>`
3. (Optional) `rm -rf .git` then `git init` to get a fresh commit history
4. `npm install`
5. Edit `package.json`
    - Set `name` to the bookmarklet's name.
    - Set `description`
6. Write bookmarklet code in `src/bookmarklet.js`.
7. Write docs in `src/index.md`.
8. [Deploy](#deployment)

## Config

The config is in `package.json` at the `eleventy-bookmarklet` property.

```js
// package.json
{
  //...
  "eleventy-bookmarklet": {
    "type": "lazy-load", // or "inline"
    "url": "https://username.github.io/my-bookmarklet"
  }
}
```

### type

- `inline` - All the bookmarklet code is inlined into a link on the page. This runs instantly when triggered but users have to re-bookmark to get code updates. Probably has a [size limitation](https://stackoverflow.com/q/417142).
- `lazy-load` - The bookmarklet code is lazy-loaded when bookmarklet is run. This has a slight delay when triggered but users always get the latest version of the bookmarklet.

### url

Only required when type is `lazy-load`.

The url that the eleventy website (the `index.md` content) is served at. The bookmarklet js code is loaded relative to this url.

## Scripts

### Develop

- `npm run dev` - Run local dev server with auto refresh

### Deploy

- `npm run build` - Generic site build
- `npm run build:github-pages` - Build site for GitHub pages
- `npm run build:gitlab-pages` - Build site for GitLab pages

## Available template data

This is available to templates in addition to the [data supplied by 11ty](https://www.11ty.dev/docs/data-eleventy-supplied/).

### `code`

The code of the bookmarklet.

## Bookmarklet website

This is an [11ty 2.0](https://www.11ty.dev/) website.

- There's only one layout: `src/_includes/layout.njk`
- All md files may use [Nunjucks templating](https://mozilla.github.io/nunjucks/).

## Deployment

### GitHub Pages

1. Create a GitHub repo for the bookmarklet and use the git CLI to set it up as a remote repo
2. Rename github folder: `mv _.github .github`
3. Commit and push to the new repo
4. In the GitHub repo's web UI go to: Settings => Code and automation => Pages
    - set Source: `Deploy from a branch`
    - set Branch: `gh-pages`, then `/ (root)`, then click Save button

The `index.md` content will be served at `https://<github username>.github.io/<repo name>`.

### GitLab Pages

1. Rename gitlab file: `mv _.gitlab-ci.yml .gitlab-ci.yml`
2. Commit changes
3. Push changes to a GitLab repo

The `index.md` content will be served at `https://<gitlab username>.gitlab.io/<repo name>`.

### Other Providers

https://www.11ty.dev/docs/deployment/#providers
