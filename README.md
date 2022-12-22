# SAGE UI

UI library for [insert name here] projects.

## Install

`npm i @oskarengstrom/sage-ui`

## Develop

Run `npm run i-all` first time.

`npm run dev` fires up both rollup with -watch parallel to playground react app in dev mode.

`npm run build-watch` fires up rollup with -watch.

### NPM Link

1. In the package project, run `npm link`.
2. In the reciever project, run `npm link @oskarengstrom/sage-ui`
3. In the reciever project, add this to `next.config.json`:

```
const path = require("path")

const nextConfig = {
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@emotion/core": path.resolve("./node_modules/@emotion/core"),
      "@emotion/react": path.resolve("./node_modules/@emotion/react"),
      react: path.resolve("./node_modules/react"),
    }

    return config
  },
}

module.exports = nextConfig
```

#### Unlinking

Order is important:

1. sage-ui: `npm link`
2. project: `npm unlink --no-save @oskarengstrom/sage-ui`

### Publish

1. Bump version in package.json
2. `npm publish`
3. push to git

### Notes

Good resource when stuck with bugs on NPM Link:  
https://codebuckets.com/2022/02/20/npm-link-set-up-and-troubleshooting/

TODO: versioning with tags:  
https://dev.to/nop33/using-npm-distribution-tags-the-right-way-562f
