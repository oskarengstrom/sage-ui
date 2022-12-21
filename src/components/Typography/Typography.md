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

`dev` bool

`as` element

`fontFamily` string[]

`fontSize` unit | number ("rem")[]

`fontWeight` string[]

`lineHeight` unit | number ("rem")[]

`color` string[]

`textAlign` string[]

`textDecoration` string[]

`textTransform` string[]

## Variants

You can define pre-built variants in theme. Start by making sure the `variants` object is available in the theme:

```
const theme = {
  text: {
    ...
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

The `default` variant props are added on all Typography elements, but can be overridden by variants or component props.
