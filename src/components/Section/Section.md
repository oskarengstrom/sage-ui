# Section

Looks in theme to automatically add x-padding and background color

These are the theme keys it uses:

```
theme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  section: {
    maxWidth: "62rem",
    xPadding: ["1rem", "2rem"],
  },
  palette: {
    background: "black"
  }
}
```

Usage:

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

`backgroundColor` string (default: props.theme.palette.background)

`maxWidth` unit[] | number[] (rem) (default: props.theme.section.maxWidth)

`xPadding` unit[] | number[] (rem) (default: props.theme.section.xPadding)

`dev` bool

`as` element

{sizeMixins}

{spaceMixins}
