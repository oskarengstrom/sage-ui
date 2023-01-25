# Typography

```
// Basic usage:
<Typography>...</Typography>

// With props:
<Typography fontSize={[1, 1.5, 2]} color={"red"}>...</Typography>

// With variants:
<Typography variant="h1">...</Typography>

// Control rendered element:
<Typography as="h1">...</Typography>

```

## Props

`fontFamily` string[]

`fontSize` unit | number ("rem")[]

`fontWeight` string[]

`lineHeight` unit | number ("rem")[]

`color` string[] (default: theme.palette.text.primary || theme.palette.textPrimary)

_(the color string can be either a valid CSS color (only hex-regex supported rn), or a lookup-string that searches the theme for values, ex: "palette.text.primary")_

`textAlign` string[]

`textDecoration` string[]

`textTransform` string[]

`dev` bool

`as` element

{spaceMixins}

## Variants from theme

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
    },
  },
```

Then you can use them like so:

```
<Typography variant="h1">asdf</Typography>
```
