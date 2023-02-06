# SAGE UI

UI library for KIND projects.

Contents:  
[Concepts](#concepts)  
[Components](#components)  
[Utils](#utils)  
[Mixins](#mixins)  
[mq](#mq)  
[Install](#install)  
[Develop](#develop)

---

# Concepts

## Themeing

TBD

## Responsive props

Most props support responsive array syntax. A responsive prop can take an array of 1 to 4 items, instead of it's usual value. The first item in the array refers to sm, second to md, third to lr and fourth to xl. If less than 4 items are given, the last is used to fill the remainder of the array.

Breakpoints can be defined in the theme and will be automatically used. If no theme is available a fallback set of breakpoints are used.

`prop={[1, 2, 3, 4]}`

---

# Components

## Box

A simple div with most responsive props available

```
<Box>
    ...
</Box>
```

### Props

[gridItemMixins](#griditemmixins-)  
[sizeMixins](#sizemixins-)  
[spaceMixins](#spacemixins-)  
[backgroundColorMixins](#backgroundcolormixins-)  
[devMixins](#devmixins-)

---

## Grid

Creates responsive grids using CSS Grid

```
<Grid base={12} dev>
    <Grid.Item span={[2, 4, 6]}>...</Grid.Item>
    <Grid.Item>...</Grid.Item>
    <Grid.Item>...</Grid.Item>
</Grid>
```

### Props Grid

display: grid;  
[gridMixins](#gridmixins-)  
[sizeMixins](#sizemixins-)  
[spaceMixins](#spacemixins-)  
[backgroundColorMixins](#backgroundcolormixins-)  
[devMixins](#devmixins-)

### Props Grid.Item

[gridItemMixins](#griditemmixins-)  
[sizeMixins](#sizemixins-)  
[spaceMixins](#spacemixins-)  
[backgroundColorMixins](#backgroundcolormixins-)  
[devMixins](#devmixins-)

---

## KeepAspectRatio

```
<KeepAspectRatio ratio={16 / 9}>
   ...
</KeepAspectRatio>
```

### Props

`ratio` number[]

---

## SageProvider

Same provider as @emotion but with defaultTheme already built in.

```
import { ThemeProvider } from "@oskarengstrom/sage-ui"

export default function Home() {
  return (
    <ThemeProvider>
        ...
    </ThemeProvider>
  }
}
```

The default theme is also available if you need to extend it:

```
import { ThemeProvider, defaultTheme } from "@oskarengstrom/sage-ui"
import { myTheme } from "somewhere"

export default function Home() {
  return (
    <ThemeProvider theme={{...defaultTheme, ...myTheme}}>
        ...
    </ThemeProvider>
  }
}
```

---

## Section

Looks in theme to automatically add x-padding and background color.

_Warning: produces 2 elements; an outer section and an inner div. Restprops are spread on the inner div, and some keyword props are sent to the outer section (like id, className, as, background and backgroundColor)._

These are the theme keys it looks for:

```
theme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  section: {
    maxWidth: "62rem",
    xPadding: ["1rem", "2rem"],
  },
}
```

```
<Section>
    ...
</Section>

// With background color
<Section backgroundColor="red">
    ...
</Section>

// Use without theme || Override theme
<Section maxWidth="80rem" xPadding={[1, 1, 2]}>
    ...
</Section>
```

### Props

`maxWidth` unit[] | number(rem)[] (default: props.theme.section.maxWidth)  
`xPadding` unit[] | number(rem)[] (default: props.theme.section.xPadding)  
[sizeMixins](#sizemixins-)  
[spaceMixins](#spacemixins-)  
[backgroundColorMixins](#backgroundcolormixins-)  
[devMixins](#devmixins-)

---

## Spacer

Simple spacer-component.

```
// Basic usage
<Spacer height={[4, 6, 8]}/>
```

### Props

[sizeMixins](#sizemixins-)  
[devMixins](#devmixins-)

---

## Stack

Uses Flexbox under the hood. Great for controlling gap and alignment of horizontal and vertical stacks.

```
<Stack gap={2}>
    <div>...</div>
    <div>...</div>
    <div>...</div>
</Stack>
```

### Props

display: flex;  
[sizeMixins](#sizemixins-)  
[spaceMixins](#spacemixins-)  
[stackMixins](#stackmixins-)  
[backgroundColorMixins](#backgroundcolormixins-)  
[devMixins](#devmixins-)

---

## Typography

```
// Basic usage:
<Typography>...</Typography>

// With props:
<Typography fontSize={[1, 1.5, 2]} color={"red"}>...</Typography>
```

You can define pre-built variants in theme. Add a `typography.variants` object in theme, and create variants: (The `default` variant props are added on all Typography elements, but can be overridden by variants or component props.)

```
const theme = {
  typography: {
    variants: {
      default: {
        fontSize: "1rem",
      },
      h1: {
        fontSize: ["2rem", "3.5rem"],
      },
      ...
```

Then you can use them like so:

```
<Typography variant="h1">asdf</Typography>
```

### Props

`variant` string (default: "default")  
[typographyMixins](#typographymixins-)  
[spaceMixins](#spacemixins-)  
[backgroundColorMixins](#backgroundcolormixins-)  
[devMixins](#devmixins-)

---

# Utils

## useResponsive()

A hook with utilities that hook onto the ThemeContext. If no `theme.bp` is found, it falls back to general breakpoint settings.

Usage:

```
const { isMobile, breakpoint, breakpointIndex } = useResponsive()
```

#### { isMobile }

Shows `true | false` if the device is registered as a phone. This is done by matching userAgent and NOT by looking at screen width. Use `breakpoint` for that.

#### { breakpoint }

Shows the current screen width as a string ("sm" | "md" | "lr" | "xl").

#### { breakpointIndex }

Shows the current screen width as a number (0 | 1 | 2 | 3).

## useSSRLayoutEffect()

SSR-safe alternative to `useLayoutEffect`

## isValidColor()

Returns `true` if string is valid CSS color. Also supports color names like `red`.

## useScramble()

UI effect that scrambles a string.

```
const { generatedScramble, runScramble } = useScramble({
    sentence: "My text",
})

return (
    <div onMouseEnter={() => runScramble(10)}>
       {generatedScramble}
    </div>
)
```

#### Args

`sentence` string  
 default: "Test sentence"  
 The original string.

`speed` number  
 default: 50  
 Speed of scramble.

`loops` number  
 default: 15  
 Amount of loops before settling on the original string.

`startEmpty` bool  
 default: false  
 Choose if the original string should be visible on load.

## responsiveProp()

## findValueInObject()

---

# Mixins

Import:

```
import {sizeMixins} from "@oskarengstrom/sage-ui";

<Card width={[8, "240px", "100%"]}>...</Card>

const Card = styled.div`
  ${sizeMixins}
`;
```

"[]" means the prop uses array syntax  
"(rem)" means a number will be interpolated to rems ("1" -> "1rem")

## generic

`as` string

## gridMixins <a id="gridMixins"></a>

`base` number[]  
`gap` number(rem)[] | string[]  
`rowGap` number(rem)[] | string[]  
`columnGap` number(rem)[] | string[]  
`placeItems` string[]

## gridItemMixins <a id="gridItemMixins"></a>

`span` number[]  
`gridColumn` string[]  
`order` number[]  
`placeSelf` string[]

## sizeMixins <a id="sizeMixins"></a>

`height` unit[] | number(rem)[] (default: 1)  
`maxHeight` unit[] | number(rem)[]  
`minHeight` unit[] | number(rem)[]  
`width` unit[] | number(rem)[]  
`maxWidth` unit[] | number(rem)[]  
`minWidth` unit[] | number(rem)[]

## spaceMixins <a id="spaceMixins"></a>

`m` unit[] | number(rem)[]  
`mx` unit[] | number(rem)[]  
`my` unit[] | number(rem)[]  
`mt` unit[] | number(rem)[]  
`mr` unit[] | number(rem)[]  
`mb` unit[] | number(rem)[]  
`ml` unit[] | number(rem)[]  
`p` unit[] | number(rem)[]  
`px` unit[] | number(rem)[]  
`py` unit[] | number(rem)[]  
`pt` unit[] | number(rem)[]  
`pr` unit[] | number(rem)[]  
`pb` unit[] | number(rem)[]  
`pl` unit[] | number(rem)[]

## backgroundColorMixins <a id="backgroundColorMixins"></a>

`background` string[] (valid css color || theme key, ex: "palette.text.secondary")  
`backgroundColor` string[] (valid css color || theme key, ex: "palette.text.secondary")

## stackMixins <a id="stackMixins"></a>

`flexDirection` string("row")[]  
`gap` unit[] | number(rem)[]  
`alignItems` string("start")[]  
`justifyContent` string("start")[]

## typographyMixins <a id="typographyMixins"></a>

`fontFamily` string[]  
`fontSize` unit[] | number(rem)[]  
`fontWeight` string[]  
`lineHeight` unit[] | number(rem)[]  
`color` string[] (default: theme.palette.text.primary || theme.palette.textPrimary)  
_(the color string can be either a valid CSS color (only hex-regex supported rn), or a lookup-string that searches the theme for values, ex: "palette.text.primary")_
`textAlign` string[]  
`textDecoration` string[]  
`textTransform` string[]

## devMixins <a id="devMixins"></a>

`dev` bool

---

## mq <a id="mq"></a>

_Currently only works in styled syntax_

```
const Card = styled.div`
  ${mq.down.md} {
    height: "3rem",
  }
`;
```

- `only`
  - `sm`
  - `md`
  - `lr`
  - `xl`
  - `computer`
  - `touchDevice`
  - `stylus`
  - `retina`
- `up`
  - `md`
  - `lr`
  - `xl`
- `down`
  - `sm`
  - `md`
  - `lr`
- `supports`
  - `hover`

---

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

Create tokens:
https://github.com/settings/tokens

### Notes

Good resource when stuck with bugs on NPM Link:  
https://codebuckets.com/2022/02/20/npm-link-set-up-and-troubleshooting/

TODO: versioning with tags:  
https://dev.to/nop33/using-npm-distribution-tags-the-right-way-562f
